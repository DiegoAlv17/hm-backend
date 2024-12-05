import jsonwebtoken from "jsonwebtoken";
import { SECRET } from "../config.js";


export const authRequired = (req, res, next)=>{
    const {token} = req.cookies;
    console.log(token); 
    console.log(req.cookies);
    if(!token) return res.status(401).json({message: 'No Token, authorization denied'});
    
    jsonwebtoken.verify(token,SECRET,(err,user)=>{
        if(err) return res.status(401).json({message: 'Token is not valid'});
        req.user = user;
        next();
    })

}