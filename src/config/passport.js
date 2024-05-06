const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const Keys = require('./keys');
const Users = require('../services/users');

module.exports = (passport) => {
    let ops = {}
    ops.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
    ops.secretOrKey = Keys.secretOrKey;
    passport.use(new JwtStrategy(ops, (jwt_payload, done) => {
        Users.getUser(jwt_payload.email, (err, user) => {
            if(err) return done(err, false);
            if(user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        });
    }));
}