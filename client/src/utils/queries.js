import { gql } from '@apollo/client'

// Query for homepage and User Game info(user info)
export const QUERY_ME_BASIC = gql`
query Me {
  me {
    _id
    username
    email
    games {
      _id
      duplicates
      gameTopic
      questionCount
      creator {
        username
        _id
      }
    }
  }
}
`;

// Get Game information for specific game play
export const QUERY_GAME_INFO = gql`
query GetUserGames($gameId: ID!) {
  getUserGames(gameId: $gameId) {
    _id
    gameTopic
    questionCount
    duplicates
    isStudySet
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

export const QUERY_PUBLIC_GAMES = gql`
query GetPublicGames {
  getPublicGames {
    _id
    gameTopic
    duplicates
    questionCount
    creator {
      username
      _id
    }
  }
}
`;

// Query for temporary user 
export const QUERY_TEMP_USER = gql`
  query TempUser($id: ID!) {
    tempUser(_id: $id) {
      username
      email
      _id
      password
    }
  }
`;

export const QUERY_USER_BY_EMAIL = gql`
  query Query($email: String!) {
    userByEmail(email: $email) {
      _id
      username
      email
    }
  }
`;

export const SEARCH_PUBLIC_GAMES = gql`
query GetGameByTitle($name: String!) {
  getGameByTitle(name: $name) {
    _id
    gameTopic
    duplicates
    questionCount
    creator {
      username
      _id
    }
  }
}
`;


// Check if game already belongs to user
export const CHECK_IF_OWNER = gql`
query Query($gameId: ID!) {
  checkIfOwner(gameId: $gameId)
}
`;

// query user's library
export const QUERY_USER_LIBRARY = gql`
query queryGameLibrary($name: String!) {
  queryGameLibrary(name: $name) {
    _id
    gameTopic
    duplicates
    questionCount
    creator {
      username
      _id
    }
  }
}
`;

// Query teacher's study sets
export const QUERY_STUDY_SETS = gql `
query Query($name: String!) {
  queryStudySets(name: $name) {
    _id
    gameTopic
    questionCount
  }
}
`;

// Query individual game for study set
// Get Game information for specific game play
export const QUERY_SINGLE_STUDY_SET = gql`
query GetUserGames($gameId: ID!) {
  getUserGames(gameId: $gameId) {
    gameTopic
    gameData {
      clues {
        answer
        question
      }
    }
  }
}
`;

