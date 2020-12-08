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
  query repositories(
    $orderBy: AllRepositoriesOrderBy!
    $orderDirection: OrderDirection!
    $searchKeyword: String
    $first: Int!
    $after: String
  )
  {
    repositories(
      orderBy: $orderBy
      orderDirection: $orderDirection
      searchKeyword: $searchKeyword
      first: $first
      after: $after
      ) 
    {
      edges {
        node {
          ...RepositoryDetails
        }
      }
      pageInfo {
        endCursor
        startCursor
        totalCount
        hasNextPage
      }
    }
  }
  ${REPOSITORY_DETAILS}
`;

export const GET_SINGLE_REPOSITORY = gql`
  query repository(
    $id: ID!
    $first: Int!
    $after: String
  ) 
  {
    repository(id: $id) 
    {
      ...RepositoryDetails
      reviews(first: $first, after: $after)
      {
        edges 
        {
          node 
          {
            id
            text
            rating
            createdAt
            user {
              id
              username
            }
          }
        }
        pageInfo 
        {
          endCursor
          startCursor
          totalCount
          hasNextPage
        }
      }
    }
  }
  ${REPOSITORY_DETAILS}
`;

export const IS_AUTHORIZED = gql`
  query getAuthorizedUser($includeReviews: Boolean = false) {
    authorizedUser 
    {
      id
      username
      reviews @include(if: $includeReviews) 
      {
        edges 
        {
          node 
          {
            id
            text
            rating
            createdAt
            repository 
            {
              id
              fullName
            }
            user 
            {
              id
              username
            }
          }
        }
      }
    }
  }
`;