import express, { Application, Request, RequestHandler, Response } from "express";
import 'express-async-errors';
import cookieParser from "cookie-parser";
import morgan from 'morgan';
import helmet from 'helmet';

import BaseRouter from "./routes";
import Config from "./config/environment";
import { errorHandler } from "@utils/errorHandler";
import { Server as httpServer, createServer } from "http";
import { dbConnect } from "@config/mongodb";

export const Server = (): httpServer => {
    const app: Application = express();

    // //// Connect to the Mongo DB ////
    dbConnect()
        .then(() => console.log("Connection to MongoDB successful"))
        .catch((err) => console.error(err));

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser());
    if (Config.NODE_ENV === 'development') {
        app.use(morgan('dev'));
    }
    if (Config.NODE_ENV === 'production') {
        app.use(helmet());
    }

    // Add APIs
    app.use("/api", BaseRouter);

    // Setup error handler
    app.use(errorHandler as unknown as RequestHandler);

    app.get("/", (_: Request, res: Response) => {
        res.send("Express server with TypeScript");
    });

    return createServer(app);
}