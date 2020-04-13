const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
const keys = require("../config/keys");
const $sql = require('../server/sqlMap');
const db = require('./db');

const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;
module.exports = (passport) => {
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
        db.query($sql.users.select_id, jwt_payload.id, (err, result) => {
            if (err) {
                console.log(err)
            }
            if (result[0] === undefined) {
                return done(null, false);
            } else {
                //console.log(result[0] )
                return done(null, result[0]);
            }
        });
        //  == mysql 
        // module.exports = (passport,connection) => {
        //     passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
        //     //console.log(jwt_payload);
        //     connection.query($sql.users.select_id,jwt_payload.id,(err,result)=> {
        //         //console.log(result.counts);0
        //         //console.log(result[0] )
        //         if(err) {
        //             console.log(err)
        //         }
        //         if(result[0] === undefined) {
        //             return done(null, false);
        //         }else {
        //             //console.log(result[0] )
        //             return done(null, result[0]);
        //         }
        //     });
        //  == mongodb 
        // User.findById(jwt_payload.id)
        //     .then(user => {
        //         if (user) {
        //             return done(null, user);
        //         }
        //         return done(null, false);
        //     })
        //     .catch(err => console.log(err));
    }));
}