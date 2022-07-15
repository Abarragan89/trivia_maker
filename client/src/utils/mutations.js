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
mutation Mutation($answers: [[String]]!, $questions: [[String]]!, $topic: String!, $categories: [String]!) {
  createGame(answers: $answers, questions: $questions, topic: $topic, categories: $categories) {
    gameTopic
    categories
    answers
    questions
  }
}
`;