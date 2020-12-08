import { useMutation } from '@apollo/react-hooks';

import { CREATE_REVIEW } from '../graphql/mutations';

const useCreateReview = () => {
  const [mutate, result] = useMutation(CREATE_REVIEW);

  const createReview = async ({ ownerName, repositoryName, rating, text }) => {
    const { data } = await mutate({
      variables: {
        ownerName: ownerName,
        repositoryName: repositoryName,
        rating: rating,
        text: text || '',
      }
    });

    return data;
  };

  return [createReview, result];
};

export default useCreateReview;