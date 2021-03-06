import { useQuery } from '@apollo/react-hooks';

import { IS_AUTHORIZED } from '../graphql/queries';

const useMyReviews = () => {
  const { loading, error, data, refetch } = useQuery(IS_AUTHORIZED, {
    fetchPolicy: 'cache-and-network',
    variables: {
      includeReviews: true,
    },
  });

  return { data, loading, error, refetch };
};

export default useMyReviews;