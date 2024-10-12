const mysql = require('mysql2');

const pool = mysql.createPool({
    host: process.env.HOST_DB,
    user: process.env.USER_DB,
    password: process.env.PASSWORD_DB,
    database: process.env.DATABASE
})
pool.query('select 1 + 1', (err, rows) => {
    if(err) {
        console.log(err);
    } else {
        console.log("THE DATABASE HACE BEEN CONECTED");
    }
})
module.exports = pool;