interface EmailOptions {
    email: string;
    subject: string;
    templete: string;
    data: {
        [key: string]: any;
    };
}
declare const sendMail: (options: EmailOptions) => Promise<void>;
export default sendMail;
//# sourceMappingURL=sendMail.d.ts.map