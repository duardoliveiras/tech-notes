import User from "../models/User";
import Note from "../models/Note";
import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import { Request, Response, json } from "express";





// @desc Get All Users
// @route GET /users
// @acess Private
export const getAllUsers = async (req : Request, res : Response) =>{
        const users: typeof User[] = await User.find().select('-password').lean();
        // Lean return to us the data like a json document
        if(!users?.length){
            return res.status(404).json({
                message: "No users found"
            });
        }
        res.status(200).json(users);
};

// @desc Create New User
// @route POST /users
// @acess Private
export const createNewUser = async ( req: Request, res: Response) =>{
   const { username, password, roles } = req.body;

   if(!username || !password || !Array.isArray(roles) || !roles.length){
        return res.status(400).json({
            message: "All fields are required"
        });
   }

   const duplicate = await User.findOne({ username }).lean().exec();

   if(duplicate){
        return res.status(409).json({
            message: "Duplicate Username"
        });
    }

    const hashedPwd = await bcrypt.hash(password, 10) // salt rounds
    const userObject = { username, "password" : hashedPwd, roles };

    const user = await User.create(userObject);

    if(user){
        return res.status(201).json({
            message: `New user ${username} created`
        });
    }else{
        return res.status(400).json({
            message: "Invalid user data received"
        })
    }
};

// @desc Update a User
// @route PATCH /users
// @acess Private
export const updateUser = async ( req: Request, res: Response) =>{
    const { id, username, roles, active, password } = req.body;

    if(!id || !username || !Array.isArray(roles) || !roles.length || typeof active !== 'boolean'){
        return res.status(400).json({
            message: "All fields are required"
        });
    }
    const user = await User.findById(id).exec();

    if(!user){
        return res.status(400).json({
            message: "User not found"
        });
    }

    const duplicate = await User.findOne({ username }).lean().exec();

    if(duplicate && duplicate?._id.toString() !== id){
        return res.status(409).json({
            message: "Duplicate username"
        });
    }
    user.username = username;
    user.roles = roles;
    user.active = active;

    if(password){
        const hashedPwd = await bcrypt.hash(password, 10);
        user.password = hashedPwd;
    }

    const updateUser = await user.save();

    return res.status(202).json({
        message: "Updated User"
    });
};

// @desc Delete a User
// @route DELETE /users
// @acess Private
export const deleteUser = async ( req: Request, res: Response) =>{
    const { id } = req.body;

    if(!id){
        return res.status(404).json({
            message: "User ID Required"
        });
    }

    const note = await Note.findOne( { user: id }).lean().exec();

    if(note){
        return res.status(400).json({
            message: "User has assigned notes"
        });
    }

    const user = await User.findById(id);

    if(!user){
        return res.status(404).json({
            message: "User not found"
        });
    }

    const username = user.username;
    await user.deleteOne();

    return res.status(200).json({
        message: `User ${username} deleted with success`
    });
};

