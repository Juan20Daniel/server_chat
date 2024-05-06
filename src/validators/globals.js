const expretions = {
    offset:/^[0-9]+$/
}
const checkOffset = (req, res, next) => {
    const { offset } = req.params;
    if(!expretions.offset.test(offset)) {
        return res.status(500).json({success:false, message:'El rango no es válido'});
    }
    next();
}
module.exports = {
    checkOffset   
}