


const socketAuth = async (socket, next) => {
    const token = socket.handshake.query.token;
    // socket.user = await findUserFromToken(token);
    return next();
};