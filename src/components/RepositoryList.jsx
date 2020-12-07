import React, { useState } from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import { Picker } from '@react-native-community/picker';

import Text from './Text';
import TextInput from './TextInput';
import useRepositories from '../hooks/useRepositories';
import RepositoryItem from './RepositoryItem';
import theme from '../theme';

const styles = StyleSheet.create({
  separator: {
    height: 20,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  picker: {
    marginBottom: 15,
    height: 50,
    fontSize: theme.fontSizes.subheading,
    fontFamily: theme.fonts.main,
    paddingLeft: 15,
    paddingRight: 15,
    marginLeft: 5,
    marginRight: 5,
  },
  searchInput: {
    backgroundColor: 'white',
    color: 'black',
  }
});

const ItemSeparator = () => <View style={styles.separator} />;

const PickerHeaderComponent = ({
  selectedOrder,
  setSelectedOrder,
  searchTerm,
  setSearchTerm,
}) => {
  return (
    <View>
      <TextInput
        value={searchTerm}
        onChangeText={(val) => setSearchTerm(val)}
        style={styles.searchInput}
        placeholder='Search terms'
      />
      <Picker
        selectedValue={selectedOrder}
        style={styles.picker}
        onValueChange={(itemValue) => setSelectedOrder(itemValue)}
      >
        <Picker.Item label='Latest repositories' value='latest' />
        <Picker.Item label='Highest rated repositories' value='highest' />
        <Picker.Item label='Lowest rated repositories' value='lowest' />
      </Picker>
    </View>
  );
};

export const RepositoryListContainer = ({
  repositories,
  selectedOrder,
  setSelectedOrder,
  searchTerm,
  setSearchTerm,
}) => {
  const repositoryNodes = repositories ? repositories.edges.map(edge => edge.node) : [];

  return (
    <View style={styles.container}>
      <FlatList
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        keyExtractor={item => item.id}
        // To get hooks working in RepositoryItem
        // https://stackoverflow.com/a/55257123
        renderItem={obj => <RepositoryItem {...obj} />}
        ListHeaderComponent={() => <PickerHeaderComponent
          selectedOrder={selectedOrder}
          setSelectedOrder={setSelectedOrder}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}

        />}
      />
    </View>
  );
};

const RepositoryList = () => {
  const [selectedOrder, setSelectedOrder] = useState('latest');
  const [searchTerm, setSearchTerm] = useState('');
  const { data, loading } = useRepositories(selectedOrder);

  console.log('MAIN', searchTerm);

  if (loading) {
    return (
      <View>
        <Text>loading...</Text>
      </View>
    );
  }

  return (
    <RepositoryListContainer
      repositories={data.repositories}
      selectedOrder={selectedOrder}
      setSelectedOrder={setSelectedOrder}
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
    />
  );
};

export default RepositoryList;
