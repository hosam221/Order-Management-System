import type { Request, Response } from 'express';
import type { User } from '../models/user.js';
import {  UserStore } from '../models/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
// import express from 'express';
import type { Application } from 'express';



const store = new UserStore();
const { BCRYPT_PASSWORD, SALT_ROUNDS, TOKEN_SECRET } = process.env;

const index = async (_req:Request,res:Response)=>{
    try{
        const users= await store.index();
        if (users.length === 0) {
            return res.json({ message: "No users found" });
        }
        //test:
        console.log(users);
        res.json(users);
        
    }catch(err){
        res.status(400);
        res.json(err);
    }
};


const create = async (req: Request, res: Response)=>{
    try{
        const user:User={
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            password_hash: req.body.password_hash,
            role: req.body.role
        }

        const hash =bcrypt.hashSync(
            user.password_hash + BCRYPT_PASSWORD,
            parseInt(SALT_ROUNDS as string)
        );

        user.password_hash=hash;
        const newUser=await store.create(user);

        // CREATE JWT TOKEN
        const token = jwt.sign({ user: newUser }, TOKEN_SECRET as string);
        
        return res.status(201).json({
            message: "user created successfully",
            token
        });
    }
    catch(err){
        return res.status(400).json({
            message:`user not created ,Error: ${err}`
        });

    }

};

const user_routes = (app: Application) => {
  app.get('/users', index);
  app.post('/users', create);
};

export default user_routes;
