import dotenv from 'dotenv';
dotenv.config();
import { CatchAsyncError } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import userModel from "../models/userSchema.js";
import jwt from 'jsonwebtoken';
import ejs from 'ejs';
import path from 'path';
import sendMail from '../utils/sendMail.js';
export const registerationUser = CatchAsyncError(async (req, res, next) => {
    try {
        const { email, password, name } = req.body;
        const isEmailExist = await userModel.findOne({ email });
        if (!isEmailExist) {
            return next(new ErrorHandler("Email already Exist", 400));
        }
        const user = {
            name,
            email,
            password
        };
        const activationToken = createActivationToken(user);
        const activationCode = activationToken.activationCode;
        const data = { user: { name: user.name }, activationCode };
        const html = await ejs.renderFile(path.join(__dirname, '../mails/activation-mail.ejs'), data);
        try {
            await sendMail({
                email: user.email,
                subject: "Activate your account",
                templete: "activation-mail.ejs",
                data
            });
            res.status(201).json({
                success: true,
                message: `Please chcek your email: ${user.email} to activate your account`,
                activationToken: activationToken.token
            });
        }
        catch (error) {
            return new ErrorHandler(error.message, 400);
        }
    }
    catch (error) {
        return next(new ErrorHandler(error.message, 400));
    }
});
export const createActivationToken = (user) => {
    const activationCode = Math.floor(1000 + Math.random() * 9000).toString();
    const token = jwt.sign({
        user, activationCode
    }, process.env.ACTIVATION_SECRET, { expiresIn: "5m" });
    return { activationCode, token };
};
//# sourceMappingURL=user.controller.js.map