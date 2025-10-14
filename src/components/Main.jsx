import { View, StyleSheet } from 'react-native';
import RepositoryList from './RepositoryList';
import Text from './Text';
import AppBar from './AppBar';

const Main = () => {
  return (
    <View>
      <AppBar></AppBar>
      <RepositoryList></RepositoryList>
    </View>
  );
};

export default Main;