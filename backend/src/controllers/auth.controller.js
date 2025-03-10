import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import cloudinary from "../lib/cloudinary.js";

import crypto from "crypto";
import { sendVerificationEmail } from "../lib/mailer.js";

const tempUsers = new Map();



export const signup = async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (!email.endsWith("cit.edu")) {
      return res.status(400).json({ message: "Only .edu emails are allowed" });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);


    const verificationCode = crypto.randomInt(100000, 999999).toString();

  
    tempUsers.set(email, { fullName, email, hashedPassword, verificationCode });

   
    await sendVerificationEmail(email, verificationCode);

    res.status(201).json({ message: "Verification code sent to your email." });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    

    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.log("Error in login controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("Error in logout controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { profilePic } = req.body;
    const userId = req.user._id;

    if (!profilePic) {
      return res.status(400).json({ message: "Profile pic is required" });
    }

    const uploadResponse = await cloudinary.uploader.upload(profilePic);
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profilePic: uploadResponse.secure_url },
      { new: true }
    );

    res.status(200).json(updatedUser);
  } catch (error) {
    console.log("error in update profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const checkAuth = (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    console.log("Error in checkAuth controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const verifyEmail = async (req, res) => {
  const { email, code } = req.body;

  try {
    const userData = tempUsers.get(email);

    if (!userData) {
      return res.status(400).json({ message: "User not found or verification expired" });
    }

    if (userData.verificationCode !== code) {
      return res.status(400).json({ message: "Invalid verification code" });
    }

 
    const newUser = new User({
      fullName: userData.fullName,
      email: userData.email,
      password: userData.hashedPassword,
      isVerified: true,
    });
    
    if(newUser.isVerified) {
      generateToken(newUser._id, res);
      await newUser.save();
    }
    await newUser.save();

   
    tempUsers.delete(email);

    res.json({ message: "Email verified successfully", user: newUser });
  } catch (error) {
    res.status(500).json({ message: "Verification failed", error });
  }
};