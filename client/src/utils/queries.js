import { gql } from '@apollo/client'

// Query or homepage(user info)
export const QUERY_ME_BASIC = gql`
  {
    me {
      _id
      username
      profilePic
    }
  }
`;