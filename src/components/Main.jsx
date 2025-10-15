import { View } from 'react-native';
import RepositoryList from './RepositoryList';
import SignIn from './SignIn';
import { Route, Routes, Navigate } from 'react-router-native';
import AppBar from './AppBar';

const Main = () => {
  return (
    <View>
      <AppBar />
      <Routes>
        <Route path="/" element={<RepositoryList />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </View>
  );
};

export default Main;