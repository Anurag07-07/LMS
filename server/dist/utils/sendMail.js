import dotenv from 'dotenv';
dotenv.config();
import nodemailer from 'nodemailer';
import path from 'path';
import ejs from 'ejs';
const sendMail = async (options) => {
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || ''),
        service: process.env.SMTP_SERVICE,
        auth: {
            user: process.env.SMTP_MAIL,
            pass: process.env.SMTP_PASSWORD,
        },
    });
    const { email, subject, templete, data } = options;
    //Get the path to email Templete
    const templetePath = path.join(__dirname, '../mails', templete);
    //Render the email templete with EJS
    const html = await ejs.renderFile(templetePath, data);
    //Send the email 
    const emailOptions = {
        from: process.env.SMTP_MAIL,
        to: email,
        subject,
        html
    };
    await transporter.sendMail(emailOptions);
};
export default sendMail;
//# sourceMappingURL=sendMail.js.map