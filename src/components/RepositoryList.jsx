import React from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import Text from './Text';

import useRepositories from '../hooks/useRepositories';

import RepositoryItem from './RepositoryItem';

const styles = StyleSheet.create({
  separator: {
    height: 20,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
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
        renderItem={RepositoryItem}
      />
    </View>
  );
};

const RepositoryList = () => {
  const { data, loading } = useRepositories();

  if (loading) {
    return (
      <View>
        <Text>loading...</Text>
      </View>
    );
  }

  return <RepositoryListContainer repositories={data.repositories} />;
};

export default RepositoryList;
