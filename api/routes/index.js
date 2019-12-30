import express from 'express';
import authRouter from './auth/auth.route';

const indexRouter = express.Router();

// Auth route
indexRouter.use(authRouter);

export default indexRouter;