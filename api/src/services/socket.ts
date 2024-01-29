
import { Application } from "express";
import { Server, ServerOptions } from "socket.io";

let io: Server;
export const socketInit = (http: Partial<ServerOptions>) => {
    try {
        io = new Server(http);
        io.use(socketAuth);
        io.on("connection", socketHandler);
    } catch (error) {
        console.log(error);
    }
}

const socketHandler = async (socket: any) => {

}