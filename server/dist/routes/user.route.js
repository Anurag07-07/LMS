import express from 'express';
import { registerationUser } from '../controllers/user.controller.js';
const userrouter = express.Router();
userrouter.post('/registration', registerationUser);
export default userrouter;
//# sourceMappingURL=user.route.js.map