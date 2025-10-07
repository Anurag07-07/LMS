import express, { Router } from 'express'
import { registerationUser } from '../controllers/user.controller.js'
const userrouter:Router = express.Router()

userrouter.post('/registration',registerationUser)

export default userrouter