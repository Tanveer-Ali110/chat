import { Router } from 'express';
import userRouter from './user.route'

const apiRouter = Router();

apiRouter.use('/user', userRouter);

export default apiRouter