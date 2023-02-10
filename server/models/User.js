const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new Schema(
    {
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
            match: [/.+@.+\..+/, 'Must match an email address!'],
            lowercase: true,
            trim: true
        },
        password: {
            type: String,
            required: true,
            minlength: 5
        },
        games: [
            {
              type: Schema.Types.ObjectId,
              ref: 'game'
            }
        ],
    },
);

// set up pre-save middleware to create password
userSchema.pre('save', async function(next) {
    if (this.isNew || this.isModified('password')) {
      const saltRounds = 10;
      this.password = await bcrypt.hash(this.password, saltRounds);
    }
    next();
});
  
// compare the incoming password with the hashed password
userSchema.methods.isCorrectPassword = async function(password) {
    return bcrypt.compare(password, this.password);
};

const User = model('user', userSchema);
module.exports = User;