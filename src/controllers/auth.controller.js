import User from '../models/user.model.js';  
import bcrypt from 'bcrypt';
import { createAccessToken } from '../libs/jwt.js';

export const register = async (req, res) => {
    const { name, email, password, role,experiencie,specialties } = req.body;

    if(role==="psicologo"){
        try{
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ success: false, message: 'El usuario ya existe' });
            }
            const passHash = await bcrypt.hash(password, 10);
            const newUser = new User({ name, email, password: passHash, role,experiencie,specialties });
            const userSaved = await newUser.save();

            const token = await createAccessToken({ id: userSaved._id });

            res.cookie('token', token, {
                httpOnly: true,  // Evita que el token sea accesible desde JavaScript
                secure: process.env.NODE_ENV === 'production',  // Solo en HTTPS si estás en producción
                sameSite: 'Strict',  // Configuración de cookies para evitar envío de cookies en solicitudes cross-origin
                maxAge: 3600000,  // El token tiene una vida de 1 hora
            });

            res.json({
                success: true,
                id: userSaved._id,
                name: userSaved.name,
                email: userSaved.email,
                role: userSaved.role,
                experiencie: userSaved.experiencie,
                specialties: userSaved.specialties,
                createdAt: userSaved.createdAt,
                updatedAt: userSaved.updatedAt
            });

        }catch(error){
            console.error(error);
            res.status(500).json({ success: false, message: 'Error al registrar el usuario' });
        }
    }else{
        try {
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ success: false, message: 'El usuario ya existe' });
            }
    
            const passHash = await bcrypt.hash(password, 10);
            const newUser = new User({ name, email, password: passHash, role });
            const userSaved = await newUser.save();
    
            const token = await createAccessToken({ id: userSaved._id });
    
            // Establecer el token como una cookie (asegúrate de que "token" sea el nombre correcto)
            res.cookie('token', token, {
                httpOnly: true,  // Evita que el token sea accesible desde JavaScript
                secure: process.env.NODE_ENV === 'production',  // Solo en HTTPS si estás en producción
                sameSite: 'Strict',  // Configuración de cookies para evitar envío de cookies en solicitudes cross-origin
                maxAge: 3600000,  // El token tiene una vida de 1 hora
            });
    
            res.json({
                success: true,
                id: userSaved._id,
                name: userSaved.name,
                email: userSaved.email,
                role: userSaved.role,
                createdAt: userSaved.createdAt,
                updatedAt: userSaved.updatedAt
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, message: 'Error al registrar el usuario' });
        }
    }
    
};

// Inicio de sesión
export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const userFound = await User.findOne({ email });
        if (!userFound) return res.status(400).json({ success: false, message: 'Usuario no encontrado' });

        const isMatch = await bcrypt.compare(password, userFound.password);
        if (!isMatch) return res.status(400).json({ success: false, message: 'Contraseña incorrecta' });

        const token = await createAccessToken({ id: userFound._id });

        // Establecer el token como una cookie
        res.cookie('token', token, {
            httpOnly: true,  // Evita que el token sea accesible desde JavaScript
            secure: process.env.NODE_ENV === 'production',  // Solo en HTTPS si estás en producción
            sameSite: 'Strict',  // Configuración de cookies para evitar envío de cookies en solicitudes cross-origin
            maxAge: 3600000,  // El token tiene una vida de 1 hora
        });

        res.json({
            success: true,
            id: userFound._id,
            name: userFound.name,
            email: userFound.email,
            profilePicture: userFound.profilePicture,
            role: userFound.role,
            bio: userFound.bio,
            experiencie: userFound.experiencie,
            specialties: userFound.specialties,
            message: 'Inicio de sesión exitoso'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error al iniciar sesión' });
    }
};

export const logout = async (req, res) => {
    res.cookie("token", "", { expires: new Date(0) });  // Elimina el token de la cookie
    return res.sendStatus(200);  // Responde con un código 200
};

export const profile = async (req, res) => {
    try {
        // Buscar el usuario usando el ID del token
        const userFound = await User.findById(req.user.id);
        if (!userFound) return res.status(404).json({ message: 'Usuario no encontrado' });

        // Retornar los datos del usuario
        return res.json({
            id: userFound._id,
            name: userFound.name,
            email: userFound.email,
            role: userFound.role,
            profilePicture: userFound.profilePicture,
            bio: userFound.bio,
            experiencie: userFound.experiencie,
            specialties: userFound.specialties,
            createdAt: userFound.createdAt,
            updatedAt: userFound.updatedAt
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener el perfil del usuario' });
    }
};
