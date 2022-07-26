const { gql } = require('apollo-server-express');

const typeDefs = gql `
    type User {
        _id: ID
        username: String 
        email: String
        games: [Game] 
        name_lower: String
    }
    type TempUser {
        _id: ID
        username: String!
        email: String!
        password: String!
        name_lower: String
    }
    type DeletedItem {
        acknowledged: Boolean
        deletedCount: Int
    }
    type categorySet {
        category: String
        clues: [cluesInfo]
    } 
    type cluesInfo {
        answer: String
        points: Int
        question: String 
    }

    type Game {
        _id: ID 
        gameTopic: String 
        gameData: [categorySet]
        questionCount: Int   
        public: Boolean
        duplicates: Int
        creator: User
    }

    type Auth {
        token: ID!
        user: User
    }

    input cluesInput {
        answer: String
        points: Int
        question: String 
    }

    
    input categorySetInput {
        category: String
        clues: [cluesInput]
    }

    type Query {  
        me: User
        users: [User]
        user(_id: ID!): User
        userByName(username: String!): User
        getUserGames(gameId: ID!): Game
        getPublicGames: [Game]
        userByEmail(email: String!): User
        tempUser(_id: ID!): TempUser

        getGameByTitle(name: String!): [Game]
    }
    type Mutation {
        login(email: String!, password: String!): Auth 
        createGame( gameData: [categorySetInput]!,  topic: String!, public: Boolean, creator: ID): Game
        deleteGame( gameId: ID!): Game
        duplicateGame( gameData: [categorySetInput]!,  topic: String!, public: Boolean, creator: ID): Game
        updateGame(gameId: ID!, gameData: [categorySetInput]!,  topic: String!, public: Boolean, creator: String): Game
        increaseDuplicateScore(gameId: ID!): Game
        updatePassword(userId: ID!, newPassword: String! ): User

        signup(username: String!, email: String!, password: String!): TempUser
        deleteTempUser(_id: ID): DeletedItem
        addTempUser(username: String!, email: String!, password: String!): TempUser
        deleteAllTempUsers: [TempUser]
        addUser(username: String!, password: String!, email: String!): Auth 
    }
    `;

module.exports = typeDefs;