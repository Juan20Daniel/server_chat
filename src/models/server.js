const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const session = require('express-session');
const logger = require('morgan');
const passport = require('passport');
const cors = require('cors');
const keys = require('../config/keys');
const v1Routes = require('../v1Routes');
const connection = require('../database/config');
const Socket = require('./socket');
const errorHandler = require('../helpers/handleErrors');
const admin = require('firebase-admin');
const serviceAcount = require('../../firebase_keys.json');

class Server {
    constructor() {
        this.app = express();
        this.PORT = process.env.PORT;
        this.server = http.createServer(this.app);
        this.io = socketio(this.server);
        connection();
    }
    middlewares() {
        this.app.use(logger('dev'));
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({
            extended:true
        }))
        this.app.use(session({
            secret: keys.secretOrKey,
            resave:false,
            saveUninitialized: false
        }));
        this.app.use(passport.initialize());
        this.app.use(passport.session());
        this.app.use('/api/v1', v1Routes);
        this.app.use(errorHandler);
    }
    configurationServer() {
        this.app.disable('x-powered-by');
    }
    configurationSocket() {
        new Socket(this.io);
    }
    exeute() {
        this.middlewares();
        this.configurationServer();
        this.configurationSocket();
        this.server.listen(this.PORT, 'localhost', () => {
            console.log("SERVER RUNNING ON THE PORT: ",this.PORT);
        });
    }
}

module.exports = Server;