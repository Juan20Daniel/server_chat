const express = require('express');
const router = express.Router();
const { Login, RequestResetPassword, UpdatePassword } = require('../controllers/auth');
const { paramEmail, paramPassword, bodyEmail, bodyPassword, verifyToken } = require('../validators/auth');

router.get('/:email/:password', paramEmail, paramPassword, Login);
router.post('/request-reset-password', bodyEmail, RequestResetPassword);
router.put('/update-password', verifyToken, bodyPassword, UpdatePassword);

module.exports = router;
