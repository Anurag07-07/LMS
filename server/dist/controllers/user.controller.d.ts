import { NextFunction, Request, Response } from "express";
export declare const registerationUser: (req: Request, res: Response, next: NextFunction) => void;
interface IActivationToken {
    token: string;
    activationCode: string;
}
export declare const createActivationToken: (user: any) => IActivationToken;
export {};
//# sourceMappingURL=user.controller.d.ts.map