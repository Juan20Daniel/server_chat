const bcryptjs = require('bcryptjs');
const Auth = {}

Auth.updatePassword = (idUser, newPassword, result) => {
    // let hash = bcryptjs.hashSync(newPassword, 10);
    // const sql = 'UPDATE users SET password=? WHERE idUser=?';
    // connection.query(sql, [hash, idUser], (err, resUpdate) => {
    //     if(err) {
    //         result(err, null);
    //     } else {
    //         result(null, resUpdate);
    //     }
    // });
}

module.exports = Auth;