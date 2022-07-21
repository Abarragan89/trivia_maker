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
      gameTopic
    }
  }
}
`;

// Get Game information for specific game play
export const QUERY_GAME_INFO = gql `
query GetUserGames($gameId: ID!) {
  getUserGames(gameId: $gameId) {
    _id
    gameTopic
    questionCount
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