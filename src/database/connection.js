const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '123.-rtyQWE',
    database:'chat'
})
pool.query('select 1 + 1', (err, rows) => {
    if(err) {
        console.log(err);
    } else {
        console.log("THE DATABASE HACE BEEN CONECTED");
    }
})
module.exports = pool;