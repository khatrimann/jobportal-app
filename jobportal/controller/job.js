var Job = require('../models/job');
var Recruiter = require('../models/recruiter');
var Candidate = require('../models/candidate');
var mongoose = require('mongoose');
var config = require('../constants');
var nodemailer = require('nodemailer');


module.exports.getJobs = (req, res, next) => {
    Job.find({})
    .populate('users_applied')
    .then(jobs => {
        res.json(jobs);
    });
};

module.exports.postJob = (req, res, next) => {
    Job.create(new Job({
        title: req.body.title,
        experience: req.body.experience,
        salary: req.body.salary,
        location: req.body.location,
        company: req.body.company
    }), (err, job) => {
        if(err) {
            console.log(err);
            return ;
        }
        Recruiter.findByIdAndUpdate({ _id: req.params.id}, { $push: {jobs: job._id} })
        .then((recruiter) => {
            console.log(recruiter);
        });
        for (var i=0; i< req.body.skills.split(",").length; i++ ) {
            job.skills.push(req.body.skills.split(",")[i]);
        }
        job.save();
    });
};

module.exports.applied = (req, res, next) => {
    Job.findOneAndUpdate({ _id: req.body.job_id }, { $push: { users_applied:  mongoose.Types.ObjectId(req.params.id) }})
    .then((job, err) => {
        if(err) {
            console.log('err');
            console.log(err);
           res.json(err);
        }
        console.log('job');
        console.log(job);
        present = false;
        job.users_applied.map(elem => {
            if(elem == req.params.id)
                present = true;
        });

        if(!present) {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
        user: config.email,
        pass: config.password
        }
    });
  
    var mailOptions = {
        from: config.email,
        to: 'mann.khatri.15cse@bml.edu.in',
        subject: 'Pending Notification',
        text: 'YOu have one job application'
    };
  
    transporter.sendMail(mailOptions, function(error, info){
        console.log('here');
        if (error) {
        console.log(error);
        } else {
        console.log('Email sent: ' + info.response);
        }
    });
       

    res.json(job);
} else {
    console.log('Already applied');
    res.send('applied');
    res.end();
}
    }); 
};

module.exports.getJob = (req, res, next) => {
    Job.findById({ _id: req.params.id })
    .populate('users_applied')
    .then(job => {
        res.json(job);
    })
};