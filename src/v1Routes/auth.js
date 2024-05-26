const express = require('express');
const router = express.Router();
const passport = require('passport');
const { Login, RequestResetPassword, UpdatePassword } = require('../controllers/auth');
const { paramEmail, paramPassword, bodyEmail, bodyPassword } = require('../validators/auth');

router.get('/:email/:password', paramEmail, paramPassword, Login);
router.post('/request-reset-password', bodyEmail, RequestResetPassword);
router.put('/update-password', passport.authenticate('jwt', {session:false}), bodyPassword, UpdatePassword);
module.exports = router;
