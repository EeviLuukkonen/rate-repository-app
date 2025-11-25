import { View } from 'react-native';
import RepositoryList from './RepositoryList';
import SignIn from './SignIn';
import SignUp from './SignUp';
import { Route, Routes, Navigate } from 'react-router-native';
import AppBar from './AppBar';
import Repository from './Repository';
import CreateReview from './CreateReview';

const Main = () => {
  return (
    <View>
      <AppBar />
      <Routes>
        <Route path="/" element={<RepositoryList />} />
          <Route path="/:repositoryId" element={<Repository />}/>
        <Route path="/signin" element={<SignIn />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path="/createreview" element={<CreateReview />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </View>
  );
};

export default Main;