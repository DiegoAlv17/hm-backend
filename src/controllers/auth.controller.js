import Auth from '../models/admin.model.js';
import bcrypt from 'bcrypt';
import { createAccessToken } from '../libs/jwt.js';

export const register = async (req, res) => {
    const { adminName, adminEmail, adminPassword, role } = req.body;

    try {
        // Verificar si el usuario ya existe
        const existingUser = await Auth.findOne({ adminEmail });
        if (existingUser) {
            return res.status(400).json({ success: false, message: 'El usuario ya existe' });
        }

        // Hashear la contraseña
        const passHash = await bcrypt.hash(adminPassword, 10);

        // Crear un nuevo registro de autenticación
        const newAuth = new Auth({
            adminName,
            adminEmail,
            adminPassword: passHash,
            role
        });

        // Guardar el nuevo usuario en la base de datos
        const authSaved = await newAuth.save();

        // Crear un token de acceso
        const token = await createAccessToken({ id: authSaved._id, role: authSaved.role });

        // Enviar la respuesta
        res.json({
            success: true,
            token,
            id: authSaved._id,
            adminName: authSaved.adminName,
            adminEmail: authSaved.adminEmail,
            role: authSaved.role,
            createdAt: authSaved.createdAt,
            updatedAt: authSaved.updatedAt
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error al registrar el usuario' });
    }
};

export const login = async (req, res) => {
    const { adminEmail, adminPassword, role } = req.body;

    try {
        const userFound = await Auth.findOne({ adminEmail });
        if (!userFound) return res.status(400).json({ success: false, message: 'User not found' });

        if (userFound.role !== role) {
            return res.status(403).json({ success: false, message: 'Access denied for this role' });
        }

        const isMatch = await bcrypt.compare(adminPassword, userFound.adminPassword);
        if (!isMatch) return res.status(400).json({ success: false, message: 'Incorrect Password' });

        const token = await createAccessToken({ id: userFound._id, role: userFound.role });
        res.json({
            success: true,
            token,
            id: userFound._id,
            adminName: userFound.adminName,
            adminEmail: userFound.adminEmail,
            role: userFound.role,
            message: 'Login success'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error al iniciar sesión' });
    }
};

export const logout = async (req, res) => {
    res.cookie("token", "", { expires: new Date(0) });
    return res.sendStatus(200);
};
