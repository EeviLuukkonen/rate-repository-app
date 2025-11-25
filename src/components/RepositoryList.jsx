import { FlatList, View, StyleSheet } from 'react-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import { Pressable } from 'react-native';
import { useNavigate } from 'react-router-native';
import { Menu, Button } from 'react-native-paper';
import { useState } from 'react';

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: '#e1e4e8',
  }
});

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({ repositories, onPressRepository, headerComponent }) => {
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
      ListHeaderComponent={headerComponent}
    />
  );
}

const RepositoryList = () => {
  const orderOptions = {
    latest: { label: 'Latest repositories', value: { orderBy: 'CREATED_AT', orderDirection: 'DESC' } },
    highest: { label: 'Highest rated repositories', value: { orderBy: 'RATING_AVERAGE', orderDirection: 'DESC' } },
    lowest: { label: 'Lowest rated repositories', value: { orderBy: 'RATING_AVERAGE', orderDirection: 'ASC' } }
  };

  const [menuVisible, setMenuVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState('latest');

  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);

  const orderPicker = (
    <Menu
      visible={menuVisible}
      onDismiss={closeMenu}
      anchor={
        <Button mode="outlined" onPress={openMenu} style={{ margin: 8 }}>
          {orderOptions[selectedOrder].label}
        </Button>
      }
    >
      <Menu.Item onPress={() => { setSelectedOrder('latest'); closeMenu(); }} title={orderOptions.latest.label} />
      <Menu.Item onPress={() => { setSelectedOrder('highest'); closeMenu(); }} title={orderOptions.highest.label} />
      <Menu.Item onPress={() => { setSelectedOrder('lowest'); closeMenu(); }} title={orderOptions.lowest.label} />
    </Menu>
  );

  const { repositories } = useRepositories(orderOptions[selectedOrder].value);
  const navigate = useNavigate();

  const onPressRepository = (id) => {
    navigate(`/${id}`);
  };

  return <RepositoryListContainer repositories={repositories} onPressRepository={onPressRepository} headerComponent={orderPicker} />
};

export default RepositoryList;