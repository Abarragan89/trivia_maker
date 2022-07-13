const { User } = require('../models');
const { signToken } = require('../utils/auth')
// const { authMiddleware } = require('../utils/auth')

const userController = {
    // Add a new user
    addUser({body}, res) {
        User.create(body)
            .then(dbUserData => signToken(dbUserData))
            .then(signUser => res.json({ signUser }))
            .catch(e => {
                console.log(e);
                res.status(400).json(e)
            });

    },
    // Login User
    login({ body }, res) {
        User.findOne({ email: body.email })
            .then(dbUserData => dbUserData.isCorrectPassword({password: body.password}))
            .then(dbUserData => signToken(dbUserData))
            .then(dbUserData => res.json(dbUserData))
            .catch(e => {
                console.log(e)
                res.status(400).json(e)
            })
  
        // if (!user) {
        //   throw new Error('Incorrect credentials');
        // }
  
        // const correctPw = await user.isCorrectPassword({ password: body.password });
  
        // if (!correctPw) {
        //   throw new Error('Incorrect credentials');
        // }
  
        // const token = signToken(user);
        // return { token, user };
      },
}
module.exports = userController;
