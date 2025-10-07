import dotenv from 'dotenv'
dotenv.config()
import { NextFunction, Request, Response } from "express"
import { CatchAsyncError } from "../middlewares/catchAsyncError.js"
import ErrorHandler from "../utils/ErrorHandler.js"
import userModel, { IUser } from "../models/userSchema.js"
import jwt, { Secret } from 'jsonwebtoken'
import ejs from 'ejs'
import path from 'path'
import sendMail from '../utils/sendMail.js'

//Regster User
interface IRegisterationBody{
  name:string,
  email:string,
  password:string,
  avatar?:string
}

export const registerationUser = CatchAsyncError(async(req:Request,res:Response,next:NextFunction)=>{
  try {
    const {email,password,name} = req.body
    const isEmailExist = await userModel.findOne({email})
    if (!isEmailExist) {
      return next(new ErrorHandler("Email already Exist",400))
    }

    const user:IRegisterationBody = {
      name,
      email,
      password
    }

    const activationToken = createActivationToken(user)
    const activationCode = activationToken.activationCode
    const data = {user:{name:user.name},activationCode}
    const html = await ejs.renderFile(path.join(__dirname,'../mails/activation-mail.ejs'),data)

    try {
      await sendMail({
        email:user.email,
        subject:"Activate your account",
        templete:"activation-mail.ejs",
        data
      })

     res.status(201).json({
      success:true,
      message:`Please chcek your email: ${user.email} to activate your account`,
      activationToken:activationToken.token
     })
    } catch (error:any) {
      return new ErrorHandler(error.message,400) 
    }

  } catch (error:any) {
    return next(new ErrorHandler(error.message,400))
  }
})

interface IActivationToken{
  token:string,
  activationCode:string,
}


export const createActivationToken = (user:any):IActivationToken => {
  const activationCode = Math.floor(1000+Math.random()*9000).toString()
  const token = jwt.sign({
    user,activationCode
  },process.env.ACTIVATION_SECRET as Secret,{expiresIn:"5m"})
  return {activationCode,token}
}