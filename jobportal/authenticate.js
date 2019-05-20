var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('./models/candidate');
var Recruiter = require('./models/recruiter');
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens

var config = require('./constants');

console.log(!config.seeker);
exports.recruiter = passport.use('recruiter', new LocalStrategy(Recruiter.authenticate()));
passport.serializeUser(Recruiter.serializeUser());
passport.deserializeUser(Recruiter.deserializeUser());
exports.candidate = passport.use('candidate', new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


exports.getToken = function(user) {
    return jwt.sign(user, config.secretKey,
        {expiresIn: 60});
};

var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.secretKey;

// exports.candidate = passport.use('candidate', new LocalStrategy(opts,
//     (jwt_payload, done) => {
//         console.log("JWT payload: ", jwt_payload);
//         User.findOne({_id: jwt_payload._id}, (err, user) => {
//             if (err) {
//                 return done(err, false);
//             }
//             else if (user) {
//                 return done(null, user);
//             }
//             else {
//                 return done(null, false);
//             }
//         });
//     }));

// exports.recruiter = passport.use('recruiter', new JwtStrategy(opts,
//     (jwt_payload, done) => {
//         console.log("JWT payload: ", jwt_payload);
//         Recruiter.findOne({_id: jwt_payload._id}, (err, user) => {
//             if (err) {
//                 return done(err, false);
//             }
//             else if (user) {
//                 return done(null, user);
//             }
//             else {
//                 return done(null, false);
//             }
//         });
//     }));

exports.verifyUser = passport.authenticate('jwt', {session: false});

exports.verifyAdmin = function(req, res, next) {
    User.findOne({_id: req.user._id})
    .then((user) => {
        console.log("User: ", req.user);
        if (user.admin) {
            next();
        }
        else {
            err = new Error('You are not authorized to perform this operation!');
            err.status = 403;
            return next(err);
        } 
    }, (err) => next(err))
    .catch((err) => next(err))
};
