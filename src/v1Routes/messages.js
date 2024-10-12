const express = require('express');
const router = express.Router();
const passport = require('passport');
const {GetMessages} = require('../controllers/messages');

router.get('/:to', passport.authenticate('jwt', {session:false}), GetMessages);

module.exports = router;