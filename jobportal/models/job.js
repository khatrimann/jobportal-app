var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var jobSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    skills: [{
        type: String
    }],
    experience: {
        type: Number,
        required: true
    },
    salary: {
        min: {
            type: Number,
            required: true
        },
        max: {
            type: Number,
            required: true
        }
    },
    location: [{
        type: String,
        required: true
    }],
    company: {
        type: String
    },
    users_applied: [{
        type: Schema.Types.ObjectId,
        unique: true,
        ref: 'User',
    }]
});

module.exports = mongoose.model('mJob', jobSchema);