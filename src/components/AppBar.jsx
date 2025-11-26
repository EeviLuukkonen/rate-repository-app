import { View, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import theme from '../theme';
import AppBarTab from './AppBarTab';
import { useQuery } from '@apollo/client';
import { GET_ME } from '../graphql/queries';
import useAuthStorage from '../hooks/useAuthStorage';
import { useApolloClient } from '@apollo/client';
import { useNavigate } from 'react-router-native';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.appBar,
    height: 120,
  },
  scrollView: {
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    alignItems: 'center',
    flexGrow: 1,
    gap: 20,
    paddingHorizontal: 15,
  }
});

const AppBar = () => {
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const navigate = useNavigate();

  const { loading, data, error } = useQuery(GET_ME, {
    fetchPolicy: 'cache-and-network',
  });

  if (loading) {
    return <></>;
  }

  if (error) {
    console.error(error);
    return <></>;
  }

  const signOut = async () => {
    await authStorage.removeAccessToken();
    apolloClient.resetStore();
    navigate('/');
  };
  
  return (
    <View style={styles.container}>
      <ScrollView horizontal contentContainerStyle={styles.scrollView}>
        <AppBarTab label="Repositories" path="/" />
        
        {data.me !== null ? (
          <>
            <AppBarTab label="Create Review" path="/createreview" />
            <AppBarTab label="My Reviews" path="/myreviews" />
            <AppBarTab label="Sign out" onPress={signOut} />
          </>
        ) : (
          <>
            <AppBarTab label="Sign in" path="/signin" />
            <AppBarTab label="Sign up" path="/signup" />
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;