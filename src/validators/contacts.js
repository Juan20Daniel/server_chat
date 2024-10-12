const expretions = {
    idContact:/^[a-z0-9]{20,30}$/
}
const checkIdContact = (req, res, next) => {
    if(!req.body.idContact) return res.status(500).json({success:false, message:'Se require el id del contacto a agregar.'});
    const { idContact } = req.body;
    if(!expretions.idContact.test(idContact)) return res.status(500).json({success:false, message:'El id del contacto no es válido.'});
    next();
}

module.exports = {
    checkIdContact
}