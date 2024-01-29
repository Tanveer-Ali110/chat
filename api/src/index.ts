import './pre-start'; // Must be the first import
import Config from "./config/constant";
import { createServer } from './server';


const startServer = (PORT: number): void => {
    // Constants    
    const serverStartMsg = `Server is listening on port: ${PORT}`;
    const serverUrl = `http://localhost:${PORT}`;

    //Server
    const app = createServer();
    app.listen(Config.PORT, () => {
        console.log(serverStartMsg, serverUrl);
    });
};

// Start the server
startServer(Config.PORT);