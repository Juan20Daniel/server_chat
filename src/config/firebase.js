const admin = require('firebase-admin');
const serviceAcount = require('../../firebase_keys.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAcount),
  storageBucket:'images-30dde.appspot.com'
});

const bucket = admin.storage().bucket();

module.exports = bucket;