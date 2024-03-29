const { Schema, model } = require('mongoose');

const TempUserSchema = new Schema(
    {
        expire_at: {type: Date, default: Date.now, expires: 180},
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        name_lower: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/.+@.+\..+/, 'Must match an email address!']
        },
        password: {
            type: String,
            required: true,
            minlength: 5
        }
    },
);

const TempUser = model('TempUser', TempUserSchema);

module.exports = TempUser;