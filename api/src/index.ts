import './pre-start'; // Must be the first import
import Config from "./config/constant";
import { createServer } from './server';
import { socketInit } from '@services/socket';


const startServer = (PORT: number): void => {
    // Constants    
    const app = createServer();

    socketInit(app);
    const serverStartMsg = `Server is listening on port: ${PORT}`;
    const serverUrl = `http://localhost:${PORT}`;

    //Server
    app.listen(Config.PORT, () => {
        console.log(serverStartMsg, serverUrl);
    });
};

// Start the server
startServer(Config.PORT);