const bcrypt = require('bcryptjs');
const Users = require('../services/users');
const emailTemplate = require('../emailTemplate/emailTemplate');
const Auth = require('../services/auth');
const { getToken, sendEmail, decodeToken } = require('../helpers/helpers');

module.exports = {
    Login(req, res) {
        const { email, password } = req.params;
        Users.getUser(email, (err, user) => {
            if(err) return res.status(500).json({success:false, message:"Ocurrio un error al hacer la consulta."});
            if(!user.length) return res.status(404).json({success:false, message:"El usuario no fue encontrado"});
            const comparePasswords = bcrypt.compareSync(password, user[0].password);
            if(!comparePasswords) return res.status(500).json({success:false, message:"La contraseña es incorrecta"});
            const userToken = {
                idUser:user[0].idUser, 
                fullname:user[0].fullname, 
                email:user[0].email, 
                avatar:user[0].avatar
            }
            const token = getToken({user:userToken});
            res.status(200).json({
                success:true,
                message:"Session iniciada.", 
                token
            });
        });
    },
    RequestResetPassword(req, res) {
        const { email } = req.body;
        Users.getUser(email, (err, user) => {
            if(err) res.status(500).json({success:false, message:"Ocurrio un error al hacer la consulta."});
            if(!user.length) return res.status(404).json({success:false, message:"El usuario no fue encontrado"});
            const userToken = {
                idUser:user[0].idUser,
                fullname:user[0].fullname,
                email:user[0].email
            }
            const token = getToken({user:userToken, dateExpire:true});
            const htmlTemplate = emailTemplate(token);
            sendEmail(user[0].email, 'Solicitud de restablecimiento de contraseña', htmlTemplate, (err, result) => {
                if(err) return res.status(500).json({success:false, message:"Error al enviar el correo", error:err});
                res.status(200).json({success:true, message:result});
            });
        });
    },
    UpdatePassword(req, res) {
        const { authorization } = req.headers;
        const token = authorization.split(' ')[1];
        const decodedToken = decodeToken(token);
        const { password } = req.body;
        Auth.updatePassword(decodedToken.idUser, password, (err, result) => {
            if(err) return res.status(500).json({success:false, message:"Error al cambiar la contraseña", error:err});
            res.status(200).json({message:'La contraseña se ha actualizado', result});
        });
    }
}