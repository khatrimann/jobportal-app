var express = require('express');
var router = express.Router();
var userController = require('../controller/user');
var jobController = require('../controller/job');
var passport = require('passport');
var config = require('../constants');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/seeker', (req, res, next) => {
  userController.postUser(req, res,next);
});

router.post('/seeker/login', passport.authenticate('candidate'), (req, res, next) => {
  config.seeker = true;  
  userController.login(req, res, next);
});

router.post('/provider/login', passport.authenticate('recruiter'), (req, res, next) => {
  config.seeker = false;
  userController.recruiterLogin(req, res, next);
});

router.post('/recruiter/job', (req, res, next) => {
    jobController.postJob(req, res, next);
});

router.get('/checkJWTToken', (req, res) => {
  console.log(req);
  passport.authenticate('jwt', {session: false}, (err, user, info) => {
    console.log("entered");
    console.log(user);
    console.log(req.user);
    if (err)
      return next(err);
    
    if (!user) {
      console.log("User doesn't exists");
      res.statusCode = 401;
      res.setHeader('Content-Type', 'application/json');
      return res.json({status: 'JWT invalid!', success: false, err: info});
    }
    else {
      console.log("User exists");
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      return res.json({status: 'JWT valid!', success: true, user: user});

    }
  }) (req, res);
});

router.put('/:id/update/seeker', (req, res, next) => {
  userController.updateSeeker(req, res, next);
});

router.post('/recruiter', (req, res, next) => {
  userController.postRecruiter(req, res, next);
});

router.put('/:id/update/recruiter', (req, res, next) => {
  userController.updateRecruiter(req, res, next);
});

router.get('/:id/seeker/profile', (req, res, next) => {
  userController.getUser(req, res, next);
});

router.get('/:id/provider/profile', (req, res, next) => {
  userController.getRecruiter(req, res, next);
});


module.exports = router;
