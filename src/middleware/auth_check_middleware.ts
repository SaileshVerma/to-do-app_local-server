import { NextFunction, Request, Response } from "express";

import * as jwt from 'jsonwebtoken'
import { getUserByEmail } from "../repository/user_db_repository";



export const verifyToken = (req, res, next) => {
    try {


        if (req.headers.authorization) {
            //get token from headers: Authorization Bearer token 
            const token = req.headers.authorization.split(" ")[1];
            if (token === null) {
                return res.status(404).json({ message: "Unauthorized user" });
            }
            //verify token:
            jwt.verify(token, '123456', (err, token) => {
                if (err) {
                    throw (err);
                    //  return res.status(404).json({message:'token verify unmatched error'})
                }
                req.uid = token.uid;


            })

            console.log("-------------------VERIFIED TOKEN-------------------------")
            //    console.log(data.email);
            //   const user=await getUserByEmail(data.email);

            next();

        }


    } catch (error) {
        console.log('verify token failed')
        return res.status(404).json({ message: "2.Unauthorized User" })

    }
}