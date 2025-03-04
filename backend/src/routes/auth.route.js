import express from "express";
import { login, logout, signup } from "../controllers/auth.controller.js";

const router = express.Router();


router.post("/signup", signup);

router.post("/login", login );

router.post("/logout", logout );

router.put("/update-profile", protectRoute, updateProfile);

export default router;