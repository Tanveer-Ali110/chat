
import { socketAuth } from "@middleware/socketAuth";
import { Server as httpServer } from "http";
import { Server, Socket } from "socket.io";

let io: Server;
export const socketInit = (http: httpServer) => {
    try {
        io = new Server(http);
        io.use(socketAuth);
        io.on("connection", socketHandler);
    } catch (error) {
        console.log(error);
    }
}

const socketHandler = async (socket: Socket) => {
    console.log('connected')
}