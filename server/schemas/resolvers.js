const { AuthenticationError } = require('apollo-server-express');
const { User, Game } = require('../models');
const { signToken } = require('../utils/auth');
require('dotenv').config();

const resolvers = {
    // Queries
    Query: {
        // Get Logged In User Information
        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({ _id: context.user._id })
                    .select('-__v -password')
                    .populate('games')
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
            }).populate('creator')
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
        deleteGame: async (parent, { gameId }, context) => {
            if (context.user) {
                try {
                    const game = await Game.deleteOne({ _id: gameId })
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
                        { $pull: { games: args.game._id }}
                    );
                    const newGame =  await Game.create({
                        gameTopic: args.topic,
                        gameData: args.gameData,
                        public: args.public,
                        creator: context.user._id
                    })
                    await User.findOneAndUpdate(
                        { _id: context.user._id },
                        { $push: { games: newGame._id }}
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