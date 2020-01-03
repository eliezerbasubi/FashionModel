import express from 'express';
import Auth from '../../controllers/authController';
import Validator from '../../middlewares/validation';
import findById from '../../middlewares/findById';

const authRouter = express.Router();

authRouter.post('/auth/signup', Validator.signUp, Auth.signUp);
authRouter.post('/auth/signin', Auth.signIn);
authRouter.patch('/auth/reset/:user_id', findById.user, Validator.reset, Auth.resetPassword);

export default authRouter;