const express = require('express');
const router = express.Router();
const { GetUsers, CreateUser } = require('../controllers/users');
const { verifyData } = require('../validators/users');
const { checkOffset } = require('../validators/globals');
const passport = require('passport');

router.get('/:offset', passport.authenticate('jwt', {session:false}), checkOffset, GetUsers);
router.post('/', verifyData, CreateUser);

module.exports = router;