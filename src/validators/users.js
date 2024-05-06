const { exists, checkCamps } = require('../helpers/helpers');
const UserService = require('../services/users');

const verifyData = (req, res, next) => {
    if(!exists(req.body)) return res.status(500).json({message:'Incorrecta cantidad de campos.'});
    const result = checkCamps(req.body);
    if(!result.areValid) {
        return res.status(500).json({
            message:'La información de los siguientes campos no es valida',
            invalidCamps:result.invalidCamps
        });
    }
    const {email} = req.body;
    UserService.getUser(email, (err, result) => {
        if(err) {
            return res.status(501).json({
                success:false,
                message:'Error al revisar si existe el correo.',
                error:err
            });
        }
        if(result.length > 0) {
            return res.status(501).json({
                success:false,
                message:'El correo ya existe, favor de colcar otro.'
            });
        }
        next();
    });
}

module.exports = { verifyData }