import { FlatList, View, StyleSheet } from 'react-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import { Pressable } from 'react-native';
import { useNavigate } from 'react-router-native';
import { Menu, Button, Searchbar } from 'react-native-paper';
import { useState } from 'react';

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: '#e1e4e8',
  }
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryListHeader = ({ selectedOrder, onChangeOrder, menuVisible, openMenu, closeMenu, orderOptions, searchQuery, setSearchQuery }) => (
  <View>
    <Searchbar
      placeholder="Search"
      onChangeText={setSearchQuery}
      value={searchQuery}
      style={{ margin: 8 }}
    />
    <Menu
      visible={menuVisible}
      onDismiss={closeMenu}
      anchor={
        <Button mode="outlined" onPress={openMenu} style={{ margin: 8 }}>
          {orderOptions[selectedOrder].label + ' ▼'}
        </Button>
      }
    >
      <Menu.Item onPress={() => { onChangeOrder('latest'); closeMenu(); }} title={orderOptions.latest.label} />
      <Menu.Item onPress={() => { onChangeOrder('highest'); closeMenu(); }} title={orderOptions.highest.label} />
      <Menu.Item onPress={() => { onChangeOrder('lowest'); closeMenu(); }} title={orderOptions.lowest.label} />
    </Menu>
  </View>
);

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
  const [searchQuery, setSearchQuery] = useState('');

  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);

  const { repositories } = useRepositories({ ...orderOptions[selectedOrder].value, searchKeyword: searchQuery });
  const navigate = useNavigate();

  const onPressRepository = (id) => {
    navigate(`/${id}`);
  };

  return (
    <RepositoryListContainer
      repositories={repositories}
      onPressRepository={onPressRepository}
      headerComponent={
        <RepositoryListHeader 
          selectedOrder={selectedOrder} 
          onChangeOrder={setSelectedOrder} 
          menuVisible={menuVisible} 
          openMenu={openMenu} 
          closeMenu={closeMenu} 
          orderOptions={orderOptions} 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
      }
    />
  )  
};

export default RepositoryList;