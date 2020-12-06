import { gql } from 'apollo-boost';

const REPOSITORY_DETAILS = gql`
  fragment RepositoryDetails on Repository 
  {
    id
    ownerAvatarUrl
    fullName
    description
    language
    stargazersCount
    forksCount
    reviewCount
    ratingAverage
    url
  } 
`;

export const GET_REPOSITORIES = gql`
  query {
    repositories {
      edges {
        node {
          ...RepositoryDetails
        }
      }
    }
  }
  ${REPOSITORY_DETAILS}
`;

export const GET_SINGLE_REPOSITORY = gql`
  query repository(
    $id: ID!
  ) 
  {
    repository(id: $id) 
    {
      ...RepositoryDetails
    }
  }
  ${REPOSITORY_DETAILS}
`;

export const IS_AUTHORIZED = gql`
  query {
    authorizedUser {
      id
      username
    }
  }
`;