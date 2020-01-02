import express from 'express';
import Auth from '../../controllers/authController';
import Validator from '../../middlewares/validation';

const authRouter = express.Router();

authRouter.post('/auth/signup', Validator.signUp, Auth.signUp);

export default authRouter;