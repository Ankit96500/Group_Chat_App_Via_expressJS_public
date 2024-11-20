import User from "../models/userM.js"
import { CreateResponse } from "../utils/customFun.js"

import bcrypt from "bcrypt";
import sequelize from "sequelize";
import JWT  from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();


const saltRounds = 10;

export async function postSignupUser(req,res){
   
    const { name, email, password ,phone_no} = req.body;
    try {
      const hashpassword = await bcrypt.hash(password, saltRounds);
  
      const data = await User.create({
        name: name,
        email: email,
        phone_no:phone_no,
        password: hashpassword,
      });
      console.log('data created',data);
      
      res
      .status(201)
      .json(CreateResponse("success","user created successfully",data))

    } catch (error) {  
      if (error instanceof sequelize.UniqueConstraintError) {
        res.status(400)
        .json(CreateResponse("failed"," request failed ,user not created",null, 'Email Must Be Unique (USER EXIST)'))
      } else {
        res.status(500)
        .json(CreateResponse("failed","request failed ,user not created",null, 'Something went wrong'));
      }
      console.log('-->',error);
      
    }
}

export async function postLoginUser(req,res){
  const email = req.body.email;
  const password = req.body.password;
 
  try {
    // first check , given email exist or not
    const user = await User.findOne({
      where: {
        email: email,
      },
    });
    // If the user does not exist
    if (!user) {
      res.status(404).json(CreateResponse("failed","request failed",null,"User does not exist"));
      return;
    }

    // If the user exists, compare the provided password with the stored hashed password
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    // If the password does not match
    if (!isPasswordMatch) {
      res.status(401).json(CreateResponse("failed","request failed",null,"Incorrect Password"));
      return;
    }
    // If both email and password are correct, send the user data as the response
      JWT.sign({ userID: user.id, name: user.name },process.env.JWT_SECRET_KEY || 'not exist',(err, token) => {
        if (err) {
          res.status(500).json(CreateResponse("failed","request failed",null,"token not generated"));
        }
        res.status(200).json(CreateResponse("success","user token generated",token));
      }
    );
  } catch (error) {
    res.status(500).json(CreateResponse("failed","request failed",null,"An Error Occured During Login"));
  }
}




