import userModel from "../models/user.model.js";



export const getUsers = async (req, res) => {
    try {
        const users = await userModel.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getUserById = async (req, res) => {
    const {id}= req.params;
    try {
        const user = await userModel.findById(id);
        if (!user) {
            return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
        }
        res.status(200).json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

export const updateUser = async (req, res) => {
    const {id}= req.params;
    const {name, email, role, profilePicture, bio}= req.body;
    try {
        const user = await userModel.findById(id);
        if (!user) {
            return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
        }
        
        user.name = name;
        user.email = email;
        user.role = role;
        user.profilePicture = profilePicture;
        user.bio = bio;
        user.updatedAt = new Date();
        const updatedUser = await user.save();
        res.status(200).json(updatedUser);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

export const deleteUser = async (req, res) =>{
    const {id}=req.params;
    try {
        const user = await userModel.findById(id);
        if (!user) {
            return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
        }
        await user.deleteOne();
        res.status(200).json({ success: true, message: 'Usuario eliminado' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

//psicologos
export const getPsicologos = async (req, res) => {
    try {
        const psicologos = await userModel.find({role: "psicologo"});
        res.status(200).json(psicologos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getPsicologoById = async (req, res) => {
    const {id}= req.params;
    try {
        const psicologo = await userModel.findById(id);
        if (!psicologo) {
            return res.status(404).json({ success: false, message: 'Psicologo no encontrado' });
        }
        res.status(200).json(psicologo);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}