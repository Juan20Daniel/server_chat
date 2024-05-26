const express = require('express');
const session = require('express-session')
const app = express();
const PORT = process.env.PORT || 3000;
const http = require('http');
const server = http.createServer(app);
const logger = require('morgan');
const passport = require('passport');
const cors = require('cors');
const keys = require('./src/config/keys');
const v1Routes = require('./src/v1Routes');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended:true
}));
app.use(cors());
app.use(session({
    secret: keys.secretOrKey,
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
require('./src/config/passport')(passport);
app.disable('x-powered-by');
app.set('port', PORT); 

app.use("/api/v1", v1Routes);

server.listen(PORT, 'localhost', () => {
    console.log("SERVER RUNNING ON THE PORT: ",PORT);
});

app.use((err, req, res, next) => {
    console.log(err);
    res.status(err.status || 500).json(err.stack);
})