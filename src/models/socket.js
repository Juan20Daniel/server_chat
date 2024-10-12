const { decodeToken } = require('../helpers/helpers');
const SocketService = require('../services/socket');
const Users = require('../services/users');
class Socket {
    constructor(io) {
        this.io = io;
        this.socketEvents();
    }
    socketEvents() {
        this.io.on('connection', async (socket) => {
            const token = socket.handshake.query['authorization'];
            if(!token) return socket.disconnect();
            const tokenDecoded = decodeToken(token);
            socket.join(tokenDecoded.uid);
            await SocketService.userStatus(tokenDecoded.uid, true);
            this.io.emit('users', await Users.getUsers());
            socket.on('new-message', async (newMessage) => {
                const message = await SocketService.saveMessage(newMessage);
                this.io.to(newMessage.to).emit('personal-message', message);
            })
            socket.on('disconnect', async () => {
                await SocketService.userStatus(tokenDecoded.uid, false);
                this.io.emit('users', await Users.getUsers());
            });
        });
    }
}

module.exports = Socket;