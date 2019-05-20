var mongoose = require('mongoose'),
Schema = mongoose.Schema,
passportlocal = require('passport-local-mongoose');

const recruiter = new Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    company: {
        type: String
    },
    jobs: [{
        type: Schema.Types.ObjectId,
        ref: 'mJob'
    }]
});

recruiter.plugin(passportlocal);

module.exports = mongoose.model('Recruiter', recruiter);