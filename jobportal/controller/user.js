var Candidate = require('../models/candidate');
var authenticate = require('../authenticate');
var Recruiter = require('../models/recruiter');
var authenticate_recruiter = require('../authenticate_recruiter');

module.exports.postUser = (req, res, next) => {
    console.log(req.body );
    
    if(!req.body) {
        res.send('error');
        return;
    }

    Candidate.register(new Candidate({
        username: req.body.username,
        firstname: req.body.firstname,
        lastname: req.body.lastname
    }), req.body.password, (err, candidate) => {
            if(err) {
                res.send(err);
                return;
            }

            // res.statusCode = 200;
            // res.setHeader('Content-Type', 'application/json');
            res.json({id: candidate._id});
    });
    //res.end();
};

module.exports.login = (req, res, next) => {
    var token = authenticate.getToken({ _id: req.user._id });
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json({success: true, token: token, firstname: req.user.firstname, lastname: req.user.lastname, status: 'You are successfully logged in!'});
};

module.exports.recruiterLogin = (req, res, next) => {
    var token = authenticate.getToken({ _id: req.user._id });
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json({success: true, token: token, firstname: req.user.firstname, lastname: req.user.lastname, status: 'You are successfully logged in!'});
};

module.exports.updateSeeker = (req, res, next) => {
    Candidate.findOneAndUpdate({_id: req.params.id}, { $push: {company: req.body.company, education: req.body.education, skills: req.body.skills}}, { upsert: true })
    .then((result) => {
        // result.company.from = new Date(req.body.company.from);
        // result.company.to = new Date(req.body.company.to);
        // result.education.from = new Date(req.body.education.from);
        // result.education.to = new Date(req.body.education.to);
        // result.save();
        console.log(result);
        res.json(result);
    });
};

module.exports.getUser = (req, res, next) => {
    const id = req.params.id;
    Candidate.findById({ _id: id })
    .then((candidate) => {
        res.json(candidate);
    });
};

module.exports.postRecruiter = (req, res, next) => {
    console.log(req.body );
    
    if(!req.body) {
        res.send('error');
        return;
    }

    Recruiter.register(new Recruiter({
        username: req.body.username,
        firstname: req.body.firstname,
        lastname: req.body.lastname
    }), req.body.password, (err, recruiter) => {
            if(err) {
                res.send(err);
                return;
            }

            // res.statusCode = 200;
            // res.setHeader('Content-Type', 'application/json');
            res.json({id: recruiter._id});
    });
    //res.end();
};

module.exports.updateRecruiter = (req, res, next) => {
    Recruiter.findOneAndUpdate({_id: req.params.id}, {company: req.body.company}, { upsert: true })
    .then((result) => {
        console.log(result);
        res.json(result);
    });
};

module.exports.getRecruiter = (req, res, next) => {
    const id = req.params.id;
    Recruiter.findById({ _id: id })
    .populate('jobs')
    .then((recruiter) => {
        res.json(recruiter);
    });
};