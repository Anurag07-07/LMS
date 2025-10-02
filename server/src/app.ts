import dotenv from  'dotenv'
dotenv.config()
import expres, { NextFunction, Request, Response } from 'express'
export const app = expres()

import cors from 'cors'
import cookieParser from 'cookie-parser'
import dbConnext from './db/dbConnect.js'

//Body Parser:Limit Data Upto 50mb
app.use(expres.json({limit:"50mb"}))

//Cookie Parser:For Parse the Cookie
app.use(cookieParser())

//Cors:Cross Origin Resource Sharing
app.use(cors({
  origin:process.env.ORIGIN
}))

//Database Connection
dbConnext()

//Testing Api
app.get('/test',(req:Request,res:Response)=>{
  res.status(200).json({
    success:true,
    message:`Api is Working`
  })
})

//Unknown Route
// app.all('*',(req:Request,res:Response,next:NextFunction)=>{
//   const err = new Error(`Route ${req.originalUrl} not Found`) as any
//   err.statusCode = 404
//   next(err)
// })