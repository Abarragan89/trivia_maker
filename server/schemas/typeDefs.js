const { gql } = require('apollo-server-express');

const typeDefs = gql `
    type User {
        _id: ID
        username: String 
        email: String
        games: [Game] 
    }

    type Game {
        _id: ID 
        gameTopic: String 
        categories: [String]
        answers: [[String]]
        questions: [[String]]
    }
    type Auth {
        token: ID!
        user: User
    }

    type Query {  
        me: User
        users: [User]
        user(_id: ID!): User
        userByName(username: String!): User
        getUserGames(gameId: ID!): Game
    }
    type Mutation {
        login(email: String!, password: String!): Auth 
        addUser(username: String!, password: String!, email: String!): Auth 
        createGame(answers: [[String]]! questions: [[String]]!, topic: String!, categories:[String]!): Game
    }
`;

module.exports = typeDefs;