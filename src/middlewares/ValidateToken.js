import jsonwebtoken from 'jsonwebtoken';
import { SECRET } from '../config.js';

export const authRequired = (req, res, next) => {
    const { token } = req.cookies;  // Asegúrate de que el token esté en las cookies
    console.log("Token:", token);  // Verifica que el token esté presente

    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    jsonwebtoken.verify(token, SECRET, (err, user) => {
        if (err) {
            return res.status(401).json({ message: 'Token is not valid' });
        }
        req.user = user;  // Asocia el usuario al request
        next();
    });
};
