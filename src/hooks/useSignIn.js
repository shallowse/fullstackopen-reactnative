import { useMutation, useApolloClient } from '@apollo/react-hooks';

import { SIGN_IN } from '../graphql/mutations';
import { useAuthStorage } from '../contexts/AuthStorageContext';

const useSignIn = () => {
  const authStorage = useAuthStorage();
  const [mutate, result] = useMutation(SIGN_IN);
  const apolloClient = useApolloClient();

  const signIn = async ({ username, password }) => {
    const { data } = await mutate({
      variables: {
        username: username,
        password: password,
      }
    });

    await authStorage.setAccessToken(data.authorize.accessToken);
    apolloClient.resetStore();

    //console.log('data', data);
  };

  return [signIn, result];
};

export default useSignIn;