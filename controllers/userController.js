
import bcrypt from "bcrypt";
import dotenv from "dotenv"
import jwt from "jsonwebtoken"
import User from "../models/user.js";

export async function createUser(req,res){
    try{
        const passwordHash=bcrypt.hashSync(req.body.password,10)

        const newUser = new User({
            email:req.body.email,
            firstName:req.body.firstName,
            lastName:req.body.lastName,
            password:passwordHash
        })

        await newUser.save()

        res.json({
            messsage:"User created Successfully"
        })

    }catch(error){

    }
}

export async function loginUser(req,res) {
    try{
        const user = await User.findOne({
            email:req.body.email
        })

        if(user==null){
            res.status(404).json({
                messsage:"user not found"
            })
        }else{
            const isPasswordCorrect = bcrypt.compareSync(req.body.password,user.password)
            if(isPasswordCorrect){
                const payload={
                    email:user.email,
                    firstName:user.firstName,
                    lastName:user.lastName,
                    isAdmin:user.isAdmin,
                    isBlocked:user.isBlocked,
                    isEmailVerified:user.isEmailVerified,
                    image:user.image
                }
            const token = jwt.sign(payload, process.env.JWT_SECRET , {
             expiresIn : "48h"
                })
                res.json({
                    token : token,
                    isAdmin : user.isAdmin,
                })

            }else{
                res.status(401).json(
                    {
                       messsage:"invalid password"
                    }
                )
            }
        }
    }catch(error){
        res.status(500).json({
            messsage:"Error logging in"
        })

        return

    }
}


export function isAdmin(req){
    if(req.user==null){
        return false
    }
    if(req.user.isAdmin){
        return true
    }else{
        return false
    }
}