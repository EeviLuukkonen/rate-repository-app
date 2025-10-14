import { View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import theme from '../theme';
import AppBarTab from './AppBarTab';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.appBar,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    height: 100,
  }
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <AppBarTab label="Repositories" onPress={() => console.log('Repositories pressed')} />
    </View>
  );
};

export default AppBar;