const connection = require('../database/connection');
const bcrypt = require('bcryptjs');
const Users = {}

Users.getUser = (email, result) => {
    const sql = 'SELECT idUser, fullname, email, password, avatar FROM users WHERE email = ?';
    connection.query(sql, [email], (err, user) => {
        if(err) {
            result(err, null);
        } else {
            result(null, user);
        }
    });
}

Users.createUser = (user, result) => {
    const sql = 'INSERT INTO users (fullname,email,password) VALUES(?,?,?)';
    var hash = bcrypt.hashSync(user.password, 10);
    connection.query(sql, [user.fullname, user.email, hash], (err, data) => {
        if(err) {
            result(err, null);
        } else {
            result(null, data);
        }
    });
}
Users.getUsers = (offset, idUser, result) => {
    const sql = `SELECT idUser, fullname, email, avatar FROM users WHERE idUser != ? LIMIT 10 OFFSET ?`;
    connection.query(sql, [idUser, parseInt(offset)], (err, users) => {
        if(err) {
            result(err, null);
        } else {
            result(null, users);
        }
    })
}

module.exports = Users;