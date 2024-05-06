const Contacts = require('../services/contacts'); 
const { decodeToken } = require('../helpers/helpers'); 

module.exports = {
    getContacts(req, res) {
        const { offset } = req.params;
        const { authorization } = req.headers;
        const token = authorization.split(' ')[1];
        const { idUser } = decodeToken(token);
        Contacts.getContacts(idUser, offset, (err, contacts) => {
            if(err) return res.status(500).json({ success:false, message:err });
            res.status(201).json({success:true, message:'Contactos', contacts});
        });
    },
    Create(req, res) {
        const { authorization } = req.headers;
        const { idContact } = req.body;
        const token = authorization.split(' ')[1];
        const { idUser } = decodeToken(token);
        Contacts.createContact(idContact, idUser, (err, result) => {
            if(err) return res.status(500).json({ success:false, message:err });
            res.status(201).json({success:true, message:'Contacto agregado.'});
        });
    }
}