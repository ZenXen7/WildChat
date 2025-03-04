import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protectRoute = async (req, res, next) => {

    
    try {
        const token = req.cookies.jwt;
        
        if(!token){
            return res.status(401).json({ message: "You are not authorized to access this resource." });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if(!decoded){
         return res.status(401).json({ message: "Token Invalid" });
        }

        const user = await User.findById(decoded.userId).select("-password");

        if(!user){
            return res.status(401).json({ message: "User not found" });
        }

        req.user = user;
        next();
    } catch (error) {

        
    }
}