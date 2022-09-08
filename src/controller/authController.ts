import { NextFunction, Request, Response } from "express";
import * as jwt from 'jsonwebtoken';
import { checkUserExist, createUser, getUserByEmail, verifyUserPassword } from "../repository/user_db_repository";


export const signIn = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const { email, password } = req.body;
        //check for the userExistence
        if (await checkUserExist(email) == false) {
          return    res.status(404).json({ message: 'User email does not exist' })
            //TODO: ask here
        }

        //password match
        if (await verifyUserPassword(email, password) == false) {
          return   res.status(404).json({ message: "InValid Password Try Again!" });
        }

        //generate token
        const user = await getUserByEmail(email);
        const token = jwt.sign({ email: email, uid: user.id }, "123456", { expiresIn: '1h' })

        res.status(200).json({user:user,token:token});
        next();
        console.log("__________User Signed Successfully____________");

    } catch (error) {
        res.status(404).json({ message: "Something went wrong" })
        next(error);
    }

}



export const signUp = async (req: Request, res: Response, next: NextFunction) => {
  
    try {
        //check is user existence
        const {email,password,name}=req.body;
          if(await checkUserExist(email)==true){
          return   res.status(404).json({message:'user with email already exist'})
          
            
          }
         
        //create user
         const createdUser=await createUser(name,email,password);

        //generate token
        const token=jwt.sign({email:email,uid:createdUser.id},"123456");
        res.status(200).json({user:createdUser,token:token});
        // next();
        console.log('__________User registered successfully__________');

    } catch (error) {
        res.status(404).json({ message: "Something went wrong" })
        next(error);
    }

}





