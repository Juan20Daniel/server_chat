const express = require('express');
const router = express.Router();
const { CreateUser, UpdateUser, RemoveImage } = require('../controllers/users');
const { verifyDataToCreate, verifyDataToUpdate } = require('../validators/users');
const upload = require('../helpers/multer');

router.post('/', verifyDataToCreate, CreateUser);
router.put('/', upload.single('image'), verifyDataToUpdate, UpdateUser);
router.delete('/:image', RemoveImage);
module.exports = router;