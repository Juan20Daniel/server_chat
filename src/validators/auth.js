const {decodeToken} = require('../helpers/helpers');
const expretions = {
    email:/^[a-zA-Z0-9.,_-]{5,30}@[a-zA-Z0-9-_]{3,15}\.[a-zA-Z.]{3,10}$/,
    password:/^.{5,40}$/
}
const isValid = (name, value) => {
    if(!value) return false;
    if(expretions[name].test(value)) return true;
    return false;
}

const paramEmail = (req, res, next) => {
    const { email } = req.params;
    let result = isValid('email', email);
    if(result) return next();
    return res.status(500).json({success:false, message:"El email no es valído"});
}
const paramPassword = (req, res, next) => {
    const { password } = req.params;
    let result = isValid('password', password);
    if(result) return next();
    return res.status(500).json({success:false, message:"La contraseña no es valída"});
}
const bodyEmail = (req, res, next) => {
    const { email } = req.body;
    let result = isValid('email', email);
    if(result) return next();
    return res.status(500).json({success:false, message:"El email no es valído"});
}
const bodyPassword = (req, res, next) => {
    const { password } = req.body;
    let result = isValid('password', password);
    if(result) return next();
    return res.status(500).json({success:false, message:"La contraseña no es valída"});
}
const verifyToken = (req, res, next) => {
    if(!req.body.token) return res.status(500).json({success:false, message:'No se encontro un token para autenticar.'});
    const tokenDecoded = decodeToken(req.body.token);
    if(!tokenDecoded)return res.status(500).json({success:false, message:'El token no es válido.'});
    next();
}
module.exports = { paramEmail, paramPassword, bodyEmail, bodyPassword, verifyToken };