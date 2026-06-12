import jwt from "jsonwebtoken";
import dotenv from  "dotenv";
dotenv.config()

export default function authenticateUser(req,res,next){
    const header=req.header("Authorization")

    if(header != null){
        const token=header.replace("Bearer ","")
        jwt.verify(token,process.env.JWT_SECRET,
        (error,decode)=>{
            if(decode==null){
                res.status(401).json(
                    {
                        message:"Invalid Token Please Login Again"
                    }
                )
            }else{
                req.user=decode
                next()
            }
        }
    )
    }else{
        next()
    }
}
