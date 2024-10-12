const User = require('../models/users');
const Message = require('../models/messages');
const Socket = {}

Socket.userStatus = async (uid, status) => {
    try {
        const user = await User.findById(uid);
        user.online = status;
        await user.save();
    } catch (error) {
        console.log(error);
        throw new Error('Error al poner el usuario en linea');
    }
}
Socket.saveMessage = async (newMessage) => {
    try {
        const message = new Message(newMessage);
        await message.save();
        return message;
    } catch (error) {
        console.log(error);
        return false;
    }
}

module.exports = Socket;

