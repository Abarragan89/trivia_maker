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