import { View, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import theme from '../theme';
import AppBarTab from './AppBarTab';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.appBar,
    height: 100,
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
  return (
    <View style={styles.container}>
      <ScrollView horizontal contentContainerStyle={styles.scrollView}>
        <AppBarTab label="Repositories" path="/" />
        <AppBarTab label="Sign in" path="/signin" />
      </ScrollView>
    </View>
  );
};

export default AppBar;