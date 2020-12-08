import React, { useState } from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import { Picker } from '@react-native-community/picker';
import { useDebounce } from 'use-debounce';

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

const HeaderComponent = ({
  selectedOrder,
  setSelectedOrder,
  searchKeyword,
  setSearchKeyword
}) => {
  return (
    <View>
      <TextInput
        value={searchKeyword}
        onChangeText={(val) => setSearchKeyword(val)}
        style={styles.searchInput}
        placeholder='Search keyword...'
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

// For Exercies 10.24: Use class component to prevent focus loss while inputing text
// https://fullstackopen.com/en/part10/testing_and_extending_our_application#exercises-10-19-10-24
export class RepositoryListContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  renderHeader = () => {
    const props = this.props;

    return (
      <HeaderComponent
        selectedOrder={props.selectedOrder}
        setSelectedOrder={props.setSelectedOrder}
        searchKeyword={props.searchKeyword}
        setSearchKeyword={props.setSearchKeyword}
      />
    );
  }

  render() {
    const props = this.props;
    const repositoryNodes = props.repositories ? props.repositories.edges.map(edge => edge.node) : [];
    return (
      <View style={styles.container}>
        <FlatList
          data={repositoryNodes}
          onEndReached={props.onEndReach}
          onEndReachedThreshold={0.5}
          ItemSeparatorComponent={ItemSeparator}
          keyExtractor={item => item.id}
          // To get hooks working in RepositoryItem
          // https://stackoverflow.com/a/55257123
          renderItem={obj => <RepositoryItem {...obj} />}
          ListHeaderComponent={this.renderHeader}
        />
      </View>
    );
  }
}

const RepositoryList = () => {
  const [selectedOrder, setSelectedOrder] = useState('latest');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [debouncedSearchKeyword] = useDebounce(searchKeyword, 500);
  const { repositories, loading, fetchMore } =
    useRepositories({ selectedOrder, searchKeyword: debouncedSearchKeyword, first: 9 });

  //console.log('RepositoryList :: repositories\n', repositories);
  //console.log('RepositoryList :: searchKeyword', debouncedSearchKeyword);

  const onEndReach = () => {
    //console.log('RepositoryList :: You have reached the end of the list');
    fetchMore();
  };

  if (loading) {
    return (
      <View>
        <Text>loading...</Text>
      </View>
    );
  }

  return (
    <RepositoryListContainer
      repositories={repositories}
      onEndReach={onEndReach}
      selectedOrder={selectedOrder}
      setSelectedOrder={setSelectedOrder}
      searchKeyword={searchKeyword}
      setSearchKeyword={setSearchKeyword}
    />
  );
};

export default RepositoryList;
