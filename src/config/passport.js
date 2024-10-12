const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const Keys = require('./keys');
const Users = require('../services/users');

module.exports = (passport) => {
    let ops = {}
    ops.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
    ops.secretOrKey = Keys.secretOrKey;
    passport.use(new JwtStrategy(ops, async (jwt_payload, done) => {
        const { email } = jwt_payload.data;
        const user = await Users.getUser(email);
        if(user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    }));
}