import './pre-start'; // Must be the first import
import Config from "./config/constant";
import { Server } from './server';
import { socketInit } from '@services/socket';


const startServer = (PORT: number): void => {
    // Constants    
    const httpServer = Server();
    socketInit(httpServer);

    const serverStartMsg = `Server is listening on port: ${PORT}`;
    const serverUrl = `http://localhost:${PORT}`;

    //Server
    httpServer.listen(Config.PORT, () => {
        console.log(serverStartMsg, serverUrl);
    });
};

// Start the server
startServer(Config.PORT);