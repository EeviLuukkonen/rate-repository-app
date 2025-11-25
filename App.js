import Main from './src/components/Main';
import { NativeRouter } from 'react-router-native';
import { ApolloProvider } from '@apollo/client';
import createApolloClient from './src/utils/apolloClient';
import Constants from 'expo-constants';
import AuthStorage from './src/utils/authStorage';
import AuthStorageContext from './src/contexts/AuthStorageContext';

const authStorage = new AuthStorage();
const apolloClient = createApolloClient(authStorage);


import { Provider as PaperProvider } from 'react-native-paper';

const App = () => {
  console.log(Constants.expoConfig);

  return (
    <NativeRouter>
      <AuthStorageContext.Provider value={authStorage}>
        <ApolloProvider client={apolloClient}>
          <PaperProvider>
            <Main />
          </PaperProvider>
        </ApolloProvider>
      </AuthStorageContext.Provider>
    </NativeRouter>
  );
};

export default App;