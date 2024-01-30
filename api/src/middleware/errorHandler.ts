import { HttpException } from "@utils/exceptions";
import { NextFunction, Response } from "express";

export const errorHandler = (error: Error | HttpException, _: Request, res: Response, next: NextFunction): Response => {
  try {
    const status = error instanceof HttpException ? error.HttpStatus : 500;
    const message: string = error.message || 'Something went wrong';

    return res.status(status).json({ message });
  } catch (error) {
    next(error);
  }
}