const express = require('express');
const router = express.Router();
const { Login, RequestResetPassword } = require('../controllers/auth');
const { paramEmail, paramPassword, bodyEmail } = require('../validators/auth');
const passport = require('passport');

router.get('/:email/:password', paramEmail, paramPassword, Login);
router.post('/request-reset-password', bodyEmail, RequestResetPassword);
module.exports = router;