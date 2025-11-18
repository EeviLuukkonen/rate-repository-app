import { useMutation, useApolloClient } from '@apollo/client';
import { SIGN_IN } from '../graphql/mutations';

import useAuthStorage from '../hooks/useAuthStorage';

const useSignIn = () => {
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();

  const [mutate, result] = useMutation(SIGN_IN);

  const signIn = async ({ username, password }) => {
    console.log('Signing in with', username, password);
    const credentials = { username, password };

    const response = await mutate({
      variables: { credentials },
    });

    await authStorage.setAccessToken(response.data.authenticate.accessToken);

    apolloClient.resetStore();

    return response;
  };

  return [signIn, result];
};

export default useSignIn;