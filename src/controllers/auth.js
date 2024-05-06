const bcrypt = require('bcryptjs');
const Users = require('../services/users');
const { getToken } = require('../helpers/helpers');
module.exports = {
    Login(req, res) {
        const { email, password } = req.params;
        Users.getUser(email, (err, user) => {
            if(err) return res.status(500).json({success:false, message:"Ocurrio un error al hacer la consulta."});
            if(!user.length) return res.status(404).json({success:false, message:"El usuario no fue encontrado"});
            const comparePasswords = bcrypt.compareSync(password, user[0].password);
            if(!comparePasswords) return res.status(500).json({success:false, message:"La contraseña es incorrecta"});
            const { idUser, fullname, email, avatar } = user[0];
            const token = getToken({ idUser, fullname, email, avatar });
            res.status(200).json({
                success:true,
                message:"Session iniciada.", 
                token
            });
        });
    },
    RefreshAccess(req, res) {
        const { email } = req.params;
        Users.getUser(email, (err, user) => {
            if(err) res.status(500).json({success:false, message:"Ocurrio un error al hacer la consulta."});
            if(!user.length) return res.status(404).json({success:false, message:"El usuario no fue encontrado"});
            const { idUser, fullname, email, avatar } = user[0];
            const token = getToken({ idUser, fullname, email, avatar });
            res.status(200).json({
                success:true,
                message:"Session iniciada.", 
                token
            });
        });
    }
}