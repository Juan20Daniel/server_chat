const expretions = {
    email:/^[a-zA-Z0-9.,_-]{5,30}@[a-zA-Z0-9-_]{3,15}\.[a-zA-Z.]{3,10}$/,
    password:/^.{5,40}$/
}
const verifyDataAuth = (req, res, next) => {
    const { email, password } = req.params;
    if(!expretions.email.test(email)) return res.status(500).json({success:false, message:"El email no es valído"});
    if(!expretions.password.test(password)) return res.status(500).json({success:false, message:"La contraseña no es valída"});
    next();
}

module.exports = { verifyDataAuth };