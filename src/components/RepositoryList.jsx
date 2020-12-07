import React, { useState } from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

import Text from './Text';
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
  }
});

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({ repositories }) => {
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
      />
    </View>
  );
};

const RepositoryList = () => {
  const [selectedOrder, setSelectedOrder] = useState('latest');
  const { data, loading } = useRepositories(selectedOrder);

  if (loading) {
    return (
      <View>
        <Text>loading...</Text>
      </View>
    );
  }

  return (
    <View>
      <Picker
        selectedValue={selectedOrder}
        style={styles.picker}
        onValueChange={(itemValue) => setSelectedOrder(itemValue)}
      >
        <Picker.Item label='Latest repositories' value='latest' />
        <Picker.Item label='Highest rated repositories' value='highest' />
        <Picker.Item label='Lowest rated repositories' value='lowest' />
      </Picker>


      <RepositoryListContainer repositories={data.repositories} />
    </View>
  );
};

export default RepositoryList;
