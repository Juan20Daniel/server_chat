const { decodeToken } = require('../helpers/helpers');
const Messages = require('../services/messages');

module.exports = {
    async GetMessages(req, res) {
        try {
            const token = req.headers.authorization;
            const { uid } = decodeToken(token.split(' ')[1]);
            const { to } = req.params;
            const history = await Messages.getMessages(uid, to);
            res.status(200).json({
                success:true,
                history
            });
        } catch (error) {
            return res.status(500).json({
                success:false,
                message:error
            });
        }
    }
}