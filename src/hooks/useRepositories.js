import { useQuery } from '@apollo/react-hooks';

import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = (variables) => {
  const { selectedOrder, searchKeyword, first} = variables;
  let queryArguments = {};

  switch (selectedOrder) {
    case 'latest':
      queryArguments = {
        orderBy: 'CREATED_AT',
        orderDirection: 'DESC',
      };
      break;
    case 'highest':
      queryArguments = {
        orderBy: 'RATING_AVERAGE',
        orderDirection: 'DESC'
      };
      break;
    case 'lowest':
      queryArguments = {
        orderBy: 'RATING_AVERAGE',
        orderDirection: 'ASC',
      };
      break;
    default:
      queryArguments = {
        orderBy: 'CREATED_AT',
        orderDirection: 'DESC',
      };
  }

  if (searchKeyword !== '') {
    queryArguments = {
      ...queryArguments,
      searchKeyword
    };
  }

  queryArguments = {
    ...queryArguments,
    first,
  }

  //console.log('useRepositories :: queryArguments', queryArguments);

  const { loading, data, fetchMore, ...result } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
    variables: { ...queryArguments },
  });

  const handleFetchMore = () => {
    const canFetchMore = !loading && data && data.repositories.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      query: GET_REPOSITORIES,
      variables: {
        after: data.repositories.pageInfo.endCursor,
        ...queryArguments,
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        const nextResult = {
          repositories: {
            ...fetchMoreResult.repositories,
            edges: [
              ...previousResult.repositories.edges,
              ...fetchMoreResult.repositories.edges,
            ],
          }
        };
        return nextResult;
      },
    });
  };

  return {
    repositories: data ? data.repositories : undefined,
    fetchMore: handleFetchMore,
    loading,
    ...result,
  };
};

export default useRepositories;