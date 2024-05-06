const Users = require('../services/users');
const Contacts = require('../services/contacts');
const { getToken, decodeToken, extractIdContacts } = require('../helpers/helpers');
module.exports = {
    GetUsers(req, res) {
        const { offset } = req.params;
        const token = req.headers.authorization;
        const { idUser } = decodeToken(token.split(' ')[1]);
        Contacts.getIdsContacts(idUser,(err, contacts) => {
            if(err) {
                return res.status(500).json({
                    success:false,
                    message:'Hubo un error al obtener los contacts.',
                    error:err
                });
            }
            Users.getUsers(offset,idUser,(err, users) => {
                if(err) {
                    return res.status(500).json({
                        success:false,
                        message:'Hubo un error al obtener los contacts.',
                        error:err
                    });
                }
                if(!contacts.length) return res.status(200).json({success:true,message:'Usuarios',users});
                const idContact = extractIdContacts(contacts);
                const deleteContacts = users.filter(user => {
                    return !idContact.includes(user.idUser) && user;
                });
                res.status(200).json({success:true, message:'Usuarios', users:deleteContacts});
            });
        });
    },

    CreateUser(req, res) {
        Users.createUser(req.body, (err, data) => {
            if(err) {
                return res.status(500).json({
                    success:false,
                    message:'Hubo un error al crear el usuario',
                    error:err
                });
            }
            const { fullname, email } = req.body;
            const result = getToken({idUser:data.insertId, fullname, email, avatar:null});
            res.status(200).json({
                success:true,
                message:"Usuario creado",
                token:result.token,
                refreshToken:result.refreshToken
            });
        });
    }
}