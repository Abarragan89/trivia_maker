const { gql } = require('apollo-server-express');

const typeDefs = gql `
    type User {
        _id: ID
        username: String 
        email: String
        games: [Game] 
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
    }
    type Mutation {
        login(email: String!, password: String!): Auth 
        addUser(username: String!, password: String!, email: String!): Auth 
        createGame( gameData: [categorySetInput]!,  topic: String!, public: Boolean, creator: ID): Game
        deleteGame( gameId: ID!): Game
    }
`;

module.exports = typeDefs;