import { useQuery } from '@apollo/react-hooks';

import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = (orderValue) => {
  //console.log('useRepositories :: orderValue', orderValue);
  let queryArguments = {};

  switch (orderValue) {
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
      }
      break;
    default:
      queryArguments = {
        orderBy: 'CREATED_AT',
        orderDirection: 'DESC',
      }
  }

  const { loading, error, data, refetch } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
    variables: { ...queryArguments },
  });

  return { data, loading, error, refetch };
};

export default useRepositories;