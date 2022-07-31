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
            return User.findOne({ name_lower: username.toLowerCase() })
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
            const userInfo = await User.findOne({ email: email.toLowerCase() }).select('-__v -password')
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
                const regex = new RegExp(name, 'gi')
                return Game.find({ public: true, gameTopic: regex }).sort({ duplicates: -1 }).populate('creator')

            } catch (e) {
                console.log(e)
            }
        },
        checkIfOwner: async (parent, { gameId }, context) => {
            if (context.user) {
                try {
                    const gameFound = await Game.findOne({ _id: gameId }).populate('creator')
                    const ownerId = gameFound.creator._id;
                    if (context.user._id == ownerId) {
                        return 'true'
                    } else {
                        return 'false'
                    }
                } catch (e) {
                    console.log(e)
                }
                throw new AuthenticationError('Not logged in');
            }
        },
        queryGameLibrary: async(parent, { name }, context) => {
            if (context.user) {
                try {
                    const regex = new RegExp(name, 'gi')
                    return Game.find({ creator: context.user._id, gameTopic: regex }).sort({ duplicates: -1 }).populate('creator')
    
                } catch (e) {
                    console.log(e)
                }
            }
        }

    },
    //Mutations
    Mutation: {
        // Add a new user
        addUser: async (parent, args) => {
            const user = await User.create({
                username: args.username,
                name_lower: args.username.toLowerCase(),
                email: args.email,
                password: args.password
            });
            const token = signToken(user);

            return { token, user };
        },
        signup: async (parent, { username, email, password }, context) => {
            if (!username || !email || !password) {
                throw new AuthenticationError('Please complete all fields.')
            }
            // Check to see if email is already registered
            const rUser = await User.findOne({ email: email.toLowerCase() });
            const pUser = await TempUser.findOne({ email: email.toLowerCase() });
            if (pUser || rUser) {
                throw new AuthenticationError('Email is already registered.')
            }
            // Check to see if username is already taken. 
            const rUserName = await User.findOne({ name_lower: username.toLowerCase() });
            const pUserName = await TempUser.findOne({ name_lower: username.toLowerCase() });
            if (pUserName || rUserName) {
                throw new AuthenticationError('Username is already taken.')
            }
            const newUser = await TempUser.create({
                email,
                username,
                password,
                name_lower: username.toLowerCase()
            });
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
            const deletedUsers = await TempUser.deleteMany({})
            return deletedUsers
        },
        // Login User
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email: email.toLowerCase() });

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
        createGame: async (parent, { topic, gameData, public, isStudySet }, context) => {
            if (context.user) {
                try {
                    const game = await Game.create({
                        gameTopic: topic,
                        gameTopic_lower: topic.toLowerCase(),
                        gameData: gameData,
                        public: public,
                        isStudySet: isStudySet,
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
        duplicateGame: async (parent, { isStudySet, topic, gameData, public }, context) => {
            if (context.user) {
                try {
                    const game = await Game.create({
                        gameTopic: topic,
                        gameTopic_lower: topic.toLowerCase(),
                        gameData: gameData,
                        public: public,
                        isStudySet: isStudySet,
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
                    await Game.findOneAndDelete(
                        { _id: args.gameId }
                    );
                    const newGame = await Game.create({
                        gameTopic: args.topic,
                        gameTopic_lower: args.topic.toLowerCase(),
                        gameData: args.gameData,
                        public: args.public,
                        isStudySet: args.isStudySet,
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