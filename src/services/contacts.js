const connection = require('../database/connection');
const Contacts = {}

Contacts.getContacts = (idUser, offset, result) => {
    const sql = 'SELECT idUser, fullname, email, avatar FROM users INNER JOIN contacts ON users.idUser = contacts.idContact WHERE contacts.idUser_contact = ? LIMIT 10 OFFSET ?'
    connection.query(sql, [idUser, parseInt(offset)], (err, contacts) => {
        if(err) {
            result(err, null);
        } else {
            result(null, contacts);
        }
    });
}
Contacts.getIdsContacts = (idUser, result) => {
    const sql = 'SELECT idUser FROM users INNER JOIN contacts ON users.idUser = contacts.idContact WHERE contacts.idUser_contact=?'
    connection.query(sql, [idUser], (err, ids) => {
        if(err) {
            result(err, null);
        } else {
            result(null, ids);
        }
    });
}
Contacts.createContact = (idContact, idUser, result) => {
    const sql = 'INSERT INTO contacts (idContact, idUser_contact) VALUES (?,?)';
    connection.query(sql, [idContact, idUser], (err, data) => {
        if(err) {
            result(err, null);
        } else {
            result(null, data);
        }
    });
}

module.exports = Contacts;