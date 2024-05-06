const express = require('express');
const router = express.Router();
const passport = require('passport');
const { Create, getContacts } = require('../controllers/contacts');
const { checkIdContact } = require('../validators/contacts');
const { checkOffset } = require('../validators/globals');

router.get('/:offset', passport.authenticate('jwt', {session:false}), checkOffset, getContacts);
router.post('/', passport.authenticate('jwt', {session:false}), checkIdContact, Create);

module.exports = router;