import { FlatList, View, StyleSheet } from 'react-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import { Pressable } from 'react-native';
import { useNavigate } from 'react-router-native';

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: '#e1e4e8',
  }
});

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({ repositories, onPressRepository }) => {
  const repositoryNodes = repositories
    ? repositories.edges.map(edge => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => (
        <Pressable onPress={() => onPressRepository(item.id)}>
          <RepositoryItem item={item} buttonVisible={false} />
        </Pressable>
      )}
      keyExtractor={item => item.id}
    />
  );
}

const RepositoryList = () => {
  const { repositories } = useRepositories();
  const navigate = useNavigate();

  const onPressRepository = (id) => {
    navigate(`/${id}`);
  };

  return <RepositoryListContainer repositories={repositories} onPressRepository={onPressRepository} />
};

export default RepositoryList;