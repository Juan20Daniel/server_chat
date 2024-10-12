require('dotenv').config();
const passport = require('passport');
const Server = require('./src/models/server');

require('./src/config/passport')(passport);

const server = new Server();

server.exeute();