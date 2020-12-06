import { useQuery } from '@apollo/react-hooks';

import { GET_SINGLE_REPOSITORY } from '../graphql/queries';

const useRepositorySingle = (id) => {
  const { loading, error, data } = useQuery(GET_SINGLE_REPOSITORY, {
    fetchPolicy: 'cache-and-network',
    variables: {
      id: id,
    }
  });

  return { data, loading, error };
};

export default useRepositorySingle;