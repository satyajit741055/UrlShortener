/*POST	/register	Register a user
POST	/login	Log in, return token
POST	/logout	Log out (optional for token-based auth)
GET	/me	Get logged-in user info*/
import { Request, Response } from "express";
import bcrypt from "bcrypt"
import UserModel from "../models/User.model";
import { loginType, userType } from "../validations/user.validation";
import jwt from "jsonwebtoken";


export const signup = async (req: Request, res: Response): Promise<void> => {

    try {
        const parsedData = userType.safeParse(req.body)
        if (!parsedData.success) {
            res.status(400).json({
                success: false,
                error: parsedData.error.flatten()
            })
            return;
        }

        const { username, email, password } = parsedData.data;
        const userExist = await UserModel.findOne({ email });
        console.log(userExist)

        if (userExist) {
            res.status(404).json({
                success: false,
                message: "User already Exist"
            })
            return;
        }
        const hashedPassword = await bcrypt.hash(password, 5);

        if (!hashedPassword) {
            console.log("Not able to hash password")
            res.status(500).json({
                success: false,
                error: "Password hashing failed"
            });
            return;
        }

        const newUser = new UserModel({
            username,
            email,
            password: hashedPassword
        })

        await newUser.save();
        res.status(201).json({
            success: true,
            message: "User Saved Successfully"
        })

    }
    catch (error) {
        console.error(error);
        res.status(400).json({
            success: false,
            error: error
        })
    }
}

export const login = async (req: Request, res: Response): Promise<void> => {

    try {
        const parsedData = loginType.safeParse(req.body)
        if (!parsedData.success) {
            res.status(400).json({
                success: false,
                error: parsedData.error.flatten()
            })
            return;
        }


        const { email, password } = parsedData.data;


        const user = await UserModel.findOne({ email });

        if (!user) {
            res.status(404).json({
                success: false,
                message: "User not Found"
            })
            return;
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            res.status(400).json({
                success: false,
                message: "Incorrect Password"
            })
            return;
        }

        const token = await jwt.sign({ userId: user._id }, process.env.JWT_SECRET as string, { expiresIn: '2d' })
        res.status(200).json({
            success: true,
            message: "Login successful",
            token: token,
            username: user.username
        })
    }
    catch (error) {
        console.error(error);
        res.status(400).json({
            success: false,
            error: error
        })
    }
}

export const userInfo = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = req.userId;
        const user = await UserModel.findById(userId).populate("urls").select('-password')
        if (!user) {
            res.status(400).json({
                success: false,
                error: "User not Found"
            })
            return;
        }
        res.status(200).json({
            data: user
        })
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            error: error
        })
    }
}