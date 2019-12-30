import express from 'express';
import Auth from '../../controllers/authController';

const authRouter = express.Router();

authRouter.post('/auth/signup', Auth.signUp);

export default authRouter;