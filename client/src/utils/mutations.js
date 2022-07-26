import { gql } from '@apollo/client';

export const ADD_USER = gql`
mutation AddUser($username: String!, $password: String!, $email: String!) {
    addUser(username: $username, password: $password, email: $email) {
      token
      user {
        username
        email
      }
    } 
  }
`;

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const CREATE_GAME = gql `
mutation Mutation($gameData: [categorySetInput]!, $topic: String!, $public: Boolean) {
  createGame(gameData: $gameData, topic: $topic, public: $public) {
    _id
    gameTopic
    questionCount
    public
    gameData {
      category
      clues {
        answer
        points
        question
      }
    }
  }
}
`;
export const DUPLICATE_GAME = gql `
mutation Mutation($gameData: [categorySetInput]!, $topic: String!, $public: Boolean) {
  duplicateGame(gameData: $gameData, topic: $topic, public: $public) {
    _id
    gameTopic
    questionCount
    public
    gameData {
      category
      clues {
        answer
        points
        question
      }
    }
  }
}
`;

export const UPDATE_GAME = gql `
mutation Mutation($gameId: ID!, $gameData: [categorySetInput]!, $topic: String!, $public: Boolean) {
  updateGame(gameId: $gameId, gameData: $gameData, topic: $topic, public: $public) {
    gameTopic
  }
}
`

export const DELETE_GAME = gql `
mutation DeleteGame($gameId: ID!) {
  deleteGame(gameId: $gameId) {
    _id
    gameTopic
  }
}
`;

export const ADD_DUPLICATION = gql `
mutation Mutation($gameId: ID!) {
  increaseDuplicateScore(gameId: $gameId) {
    gameTopic
    duplicates
  }
}
`;

export const DELETE_TEMP_USER = gql `
  mutation Mutation($id: ID) {
    deleteTempUser(_id: $id) {
      acknowledged
      deletedCount
    }
  }
`;

export const SIGN_UP = gql `
  mutation Signup($username: String!, $email: String!, $password: String!) {
    signup(username: $username, email: $email, password: $password) {
      _id
      username
      email
      password
    }
  }
`;

export const UPDATE_PASSWORD = gql `
mutation Mutation($userId: ID!, $newPassword: String!) {
  updatePassword(userId: $userId, newPassword: $newPassword) {
    _id
    username
    email
  }
}
`;