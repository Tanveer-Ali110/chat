import { NextFunction, RequestHandler, Response } from "express";

export const errorHandler = (error: Error, req: Request, res: Response, next: NextFunction): Response => {
  try {
    const message: string = error.message || 'Something went wrong';

    return res.status(500).json({ message });
  } catch (error) {
    next(error);
  }
}