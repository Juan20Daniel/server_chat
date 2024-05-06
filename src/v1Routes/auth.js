const express = require('express');
const router = express.Router();
const { Login, RefreshAccess } = require('../controllers/auth');
const { verifyDataAuth } = require('../validators/auth');
const passport = require('passport');

router.get('/:email/:password', verifyDataAuth, Login);
router.get('/:email', passport.authenticate('jwt', {session:false}), RefreshAccess);
module.exports = router;