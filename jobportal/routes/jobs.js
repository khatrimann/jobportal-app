var express = require('express'),
jobsRouter = express.Router(),
jobController = require('../controller/job');

jobsRouter.get('/', (req, res, next) => {
    jobController.getJobs(req, res, next);
});

jobsRouter.post('/:id/job', (req, res, next) => {
    jobController.postJob(req, res, next);
});

jobsRouter.put('/:id/applied', (req, res, next) => {
    jobController.applied(req, res, next);
});

jobsRouter.get('/job/:id', (req ,res, next) => {
    jobController.getJob(req, res, next);
});

module.exports = jobsRouter;