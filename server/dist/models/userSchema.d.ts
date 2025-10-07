import { Document, Model } from "mongoose";
export interface IUser extends Document {
    name: string;
    password: string;
    email: string;
    avatar: {
        public_id: string;
        url: string;
    };
    role: string;
    isVerfied: boolean;
    course: Array<{
        courseId: string;
    }>;
    comparePassword: (password: string) => Promise<boolean>;
}
declare const userModel: Model<IUser>;
export default userModel;
//# sourceMappingURL=userSchema.d.ts.map