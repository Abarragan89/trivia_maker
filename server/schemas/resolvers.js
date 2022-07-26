const { AuthenticationError } = require('apollo-server-express');
const { User, Game, TempUser } = require('../models');
const { signToken } = require('../utils/auth');
require('dotenv').config();
const { sendConfirmationEmail } = require('../mailer');
const { resetPassword } = require('../mailer')

const resolvers = {
    // Queries
    Query: {
        // Get Logged In User Information
        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({ _id: context.user._id })
                    .select('-__v -password')
                    .populate({
                        path: 'games',
                        options: { sort: { createdAt: -1 } },
                        populate: {
                            path: 'creator'
                        }
                    })

                return userData;
            }
            throw new AuthenticationError('Not logged in');
        },
        // Get single User by ID
        user: async (parent, { _id }) => {
            return User.findOne({ _id })
                .select('-__v -password')
                .populate('games')
        },
        // Get all users
        users: async () => {
            return User.find()
                .select('-__v -password')
        },
        // Get single User by Username
        userByName: async (parent, { username }) => {
            return User.findOne({ username })
                .select('-__v -password')
        },
        getUserGames: async (parent, { gameId }, context) => {
            return Game.findOne({ _id: gameId })
        },
        getPublicGames: async () => {
            return Game.find({
                public: true
            }).sort({ duplicates: -1 }).populate('creator')
        },
        // Query to reset user password by email
        userByEmail: async (parent, { email }, context) => {
            const userInfo = await User.findOne({ email: email }).select('-__v -password')
            if (!userInfo) {
                throw new AuthenticationError('No account associated with that email.')
            }
            await resetPassword(userInfo)
            return userInfo;
        },
        tempUser: async (parent, { _id }) => {
            return TempUser.findOne({ _id })
                .select('-__v')
        },
        getGameByTitle: async (parent, { name }, context) => {
            try {
                const game = await User.find(
                    { gameTopic: /.*name.*/i }
                )
                return  game;
            } catch (e) {
                console.log(e)
            }
        }
    },
    //Mutations
    Mutation: {
        // Add a new user
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);

            return { token, user };
        },
        signup: async (parent, { username, email, password }, context) => {
            if (!username || !email || !password) {
                throw new AuthenticationError('Please complete all fields.')
            }
            // Check to see if email is already registered
            const rUser = await User.findOne({ email });
            const pUser = await TempUser.findOne({ email });
            if (pUser || rUser) {
                throw new AuthenticationError('Email is already registered.')
            }
            // Check to see if username is already taken. 
            const rUserName = await User.findOne({ username });
            const pUserName = await TempUser.findOne({ username });
            if (pUserName || rUserName) {
                throw new AuthenticationError('Username is already taken.')
            }
            const newUser = await TempUser.create({ email, username, password });
            const toUser = { username, email }
            const hash = newUser._id
            await sendConfirmationEmail({ toUser, hash })
            return newUser;
        },
        // Update password 
        updatePassword: async (parent, { userId, newPassword }, context) => {
            const user = await User.findOne(
                { _id: userId },
                function (error, user) {
                    user.password = newPassword;
                    user.save(function (error) {
                        if (error) {
                            console.log('something wrong happened.')
                        }
                    })
                }
            ).clone().catch(function (err) { console.log(err) })
            if (!user) {
                throw new AuthenticationError('No account registered with that email.');
            }
            return user
        },

        // Delete temporary user once login confirmed. 
        deleteTempUser: async (parent, { _id }, context) => {
            const deletedUser = await TempUser.deleteOne({ _id })
            if (deletedUser) {
                return deletedUser;
            } else {
                throw new AuthenticationError('User does not exist');
            }
        },
        deleteAllTempUsers: async (parent, args, context) => {
            const deletedUsers = await TempUser.deleteMany({ email: 'anthonybarragan87@yahoo.com' })
            return deletedUsers
        },
        // Login User
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect Password');
            }

            const token = signToken(user);
            return { token, user };
        },
        createGame: async (parent, { topic, gameData, public }, context) => {
            if (context.user) {
                try {
                    const game = await Game.create({
                        gameTopic: topic,
                        gameData: gameData,
                        public: public,
                        creator: context.user._id
                    })
                    const user = await User.findOneAndUpdate(
                        { _id: context.user._id },
                        { $addToSet: { games: game._id } },
                        { new: true }
                    )
                    return game;
                } catch (e) {
                    console.log(e)
                }
            }
            throw new AuthenticationError('You need to be logged in!');
        },
        duplicateGame: async (parent, { creator, topic, gameData, public }, context) => {
            if (context.user) {
                try {
                    const game = await Game.create({
                        gameTopic: topic,
                        gameData: gameData,
                        public: public,
                        creator: context.user._id,
                    })
                    const user = await User.findOneAndUpdate(
                        { _id: context.user._id },
                        { $addToSet: { games: game._id } },
                        { new: true }
                    )
                    return game;
                } catch (e) {
                    console.log(e)
                }
            }
            throw new AuthenticationError('You need to be logged in!');
        },
        increaseDuplicateScore: async (parent, { gameId }, context) => {
            try {
                const game = await Game.findOneAndUpdate(
                    { _id: gameId },
                    { $inc: { duplicates: 1 } },
                    { new: true }
                )
                return game
            } catch (e) {
                console.log(e)
            }
        },
        deleteGame: async (parent, { gameId }, context) => {
            if (context.user) {
                try {
                    const game = await Game.findByIdAndDelete({ _id: gameId });
                    return game;
                } catch (e) {
                    console.log(e)
                }
            }
            throw new AuthenticationError('You need to be logged in!');
        },
        updateGame: async (parent, args, context) => {
            if (context.user) {
                try {
                    await User.findOneAndUpdate(
                        { _id: context.user._id },
                        { $pull: { games: args.gameId } }
                    );
                    const newGame = await Game.create({
                        gameTopic: args.topic,
                        gameData: args.gameData,
                        public: args.public,
                        creator: context.user._id
                    })
                    await User.findOneAndUpdate(
                        { _id: context.user._id },
                        { $push: { games: newGame._id } }
                    )
                    return newGame;
                } catch (e) {
                    console.log(e)
                }
            }
            throw new AuthenticationError('You need to be logged in!');
        }
    }
}

module.exports = resolvers;