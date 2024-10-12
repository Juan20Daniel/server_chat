const Message = require('../models/messages');
const Messages = {}
Messages.getMessages = async (fromUid, toUid) => {
    try {
        const messages = await Message.find({
            $or: [
                {from:fromUid, to:toUid},
                {from:toUid, to:fromUid}
            ]
        }).sort({createdAt:'asc'});
        return messages;
    } catch (error) {
        console.log(error);
        throw new Error('Error al consultar el historial de mensages')
    }
}
module.exports = Messages;