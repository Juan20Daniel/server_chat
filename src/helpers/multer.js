const multer = require('multer');
const exp = /^[.a-zA-Z0-9 óíúéáÁÚÉÍÓñÑ-]{2,60}(.jpg|.JPG|.png|.PNG)$/
function fileFilter (req, file, cb) {
    if(!exp.test(file.originalname)) {
        const error = new Error('El nombre de la imagen no es válido');
        cb(error);
    }
    cb(null, true);
}
const storage = multer.memoryStorage();
const upload = multer({ storage: storage, fileFilter, limits:{fileSize:600 * 600} });

module.exports = upload;