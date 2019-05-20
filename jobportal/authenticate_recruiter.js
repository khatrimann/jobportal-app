var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var Recruiter = require('./models/recruiter');
var jwt = require('jsonwebtoken');
var config = require('./constants');

exports.local = passport.use(new LocalStrategy(Recruiter.authenticate()));
passport.serializeUser(Recruiter.serializeUser());
passport.deserializeUser(Recruiter.deserializeUser());

exports.getToken = function(user) {
    return jwt.sign(user, config.secretKey,
        {expiresIn: 60});
};