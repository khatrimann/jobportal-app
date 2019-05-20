var mongoose = require('mongoose'),
Schema = mongoose.Schema,
passportlocal = require('passport-local-mongoose');

var userSchema = new Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    company: [{
        name: {
            type: String
        },
        title: {
            type: String
        },
        from: {
                type: String
        },
        to: {
            type: String
        }
        
    }],
    education: [{
        name: {
            type: String
        },
        level: {
            type: String
        },
        from: {
            type: String
        },
        to: {
            type: String
        },
        marks: {
            type: Number
        }
    }],
    skills: [{
        name: {
            type: String
        },
        level: {
            type: Number
        }
    }]
});

userSchema.plugin(passportlocal);

module.exports = mongoose.model('User', userSchema);