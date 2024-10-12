const { exists, checkCamps, checkEmail, checkFullname, checkPassword } = require('../helpers/helpers');
const UserService = require('../services/users');

const verifyDataToCreate = async (req, res, next) => {
    if(!exists(req.body)) return res.status(500).json({message:'Incorrecta cantidad de campos.'});
    const result = checkCamps(req.body);
    if(!result.areValid) {
        return res.status(500).json({
            message:'La información de los siguientes campos no es valida',
            invalidCamps:result.invalidCamps
        });
    }
    const {email} = req.body;
    try {
        const user = await UserService.getUser(email);
        if(user) {
            return res.status(501).json({
                success:false,
                message:'El correo ya existe, favor de colcar otro.'
            });
        }
        next();
    } catch (error) {
        res.status(501).json({
            success:false,
            message:'Error al revisar si existe el correo.',
            error
        });
    }
}
const verifyDataToUpdate = (req, res, next) => {
    if(req.body) {
        if(req.body.email) {
            if(!checkEmail(req.body.email)) throw new Error('El correo no es válido');
        }
        if(req.body.password) {
            if(!checkPassword(req.body.password)) throw new Error('La contraseña no es válida');
        }
        if(req.body.fullname) {
            if(!checkFullname(req.body.fullname)) throw new Error('El nombre no es válido');
        }
    }
    next();
}

module.exports = { 
    verifyDataToCreate,
    verifyDataToUpdate
}