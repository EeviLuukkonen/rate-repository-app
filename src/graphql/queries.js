import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
  query {
    repositories {
      edges {
        node {
          ownerAvatarUrl
          fullName
          description
          language
          stargazersCount
          forksCount
          ratingAverage
          reviewCount
        }
      }
    }
  }
`;

export const GET_ME = gql`
  query {
    me {
      id
      username
    }
  }
`;