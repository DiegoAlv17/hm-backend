import postModel from "../models/post.model.js";

// Crear un nuevo post
export const createPost = async (req, res) => {
    const { title,content } = req.body;
    const author = req.user.id;  // El ID del usuario se obtiene del token

    if (!content) {
        return res.status(400).json({ success: false, message: 'El contenido no puede estar vacío' });
    }
    if(!title){
        return res.status(400).json({ success: false, message: 'El titulo no puede estar vacío' });
    }

    try {
        const newPost = new postModel({
            title,
            content,
            author,  // Asociar el post con el usuario
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        const savedPost = await newPost.save();
        const populatedPost = await postModel.findById(savedPost._id).populate('author', 'name profilePicture');
        return res.status(201).json({
            success: true,
            post: populatedPost
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error al crear el post' });
    }
};

// Obtener todos los posts (se pueden agregar filtros y paginación)
export const getPosts = async (req, res) => {
    try {
        const posts = await postModel.find().sort({ createdAt: -1 }).populate('author', 'name profilePicture');  // Ordena por fecha de creación descendente y obtiene el nombre del autor

        return res.json(
            posts
        );
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error al obtener los posts' });
    }
};

// Obtener un post específico por su ID
export const getPostById = async (req, res) => {
    const { postId } = req.params;

    try {
        const post = await postModel.findById(postId);

        if (!post) {
            return res.status(404).json({ success: false, message: 'Post no encontrado' });
        }

        return res.json({
            success: true,
            post
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error al obtener el post' });
    }
};

// Actualizar un post
export const updatePost = async (req, res) => {
    const { id } = req.params;
    const { title,content } = req.body;
    const userId = req.user.id;

    if (!content) {
        return res.status(400).json({ success: false, message: 'El contenido no puede estar vacío' });
    }

    try {
        const post = await postModel.findById(id).populate('author', 'name profilePicture');

        if (!post) {
            return res.status(404).json({ success: false, message: 'Post no encontrado' });
        }

        // Verificar que el usuario sea el propietario del post o tenga permisos
        console.log(post.author);
        if (post.author._id.toString() !== userId) {
            return res.status(403).json({ success: false, message: 'No tienes permiso para editar este post' });
        }

        post.content = content;
        post.title = title;
        post.updatedAt = new Date();

        const updatedPost = await post.save();
        

        return res.json(
            updatedPost
        );
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error al actualizar el post' });
    }
};

// Eliminar un post
export const deletePost = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;

    try {
        const post = await postModel.findById(id);
        if (!post) {
            return res.status(404).json({ success: false, message: 'Post no encontrado' });
        }

        // Verificar que el usuario sea el propietario del post o tenga permisos
        if (post.author.toString() !== userId) {
            return res.status(403).json({ success: false, message: 'No tienes permiso para eliminar este post' });
        }

        await post.deleteOne();

        return res.json({
            success: true,
            message: 'Post eliminado exitosamente'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error al eliminar el post' });
    }
};

// Método para actualizar parcialmente un post
export const updatePostPartial = async (req, res) => {
    const { postId } = req.params;
    const { content, title } = req.body;  // Puedes incluir solo los campos que deseas permitir para la actualización parcial

    try {
        // Buscar el post por ID
        const post = await postModel.findById(postId);

        if (!post) {
            return res.status(404).json({ success: false, message: 'Post no encontrado' });
        }

        // Verificar si el usuario es el propietario del post (esto es opcional si necesitas controlar acceso)
        if (post.user.toString() !== req.user.id) {
            return res.status(403).json({ success: false, message: 'No tienes permisos para editar este post' });
        }

        // Actualizar los campos que se enviaron en la solicitud
        if (content) post.content = content;
        if (title) post.title = title;

        // Guardar el post actualizado
        await post.save();

        // Responder con el post actualizado
        res.json({
            success: true,
            message: 'Post actualizado parcialmente',
            post
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error al actualizar el post' });
    }
};