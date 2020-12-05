import React, {useContext} from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import Text from './Text';

import Constants from 'expo-constants';
import { Link } from 'react-router-native';

import { useQuery, useApolloClient } from '@apollo/react-hooks';
import { IS_AUTHORIZED } from '../graphql/queries';

import AuthStorageContext from '../contexts/AuthStorageContext';

import AppBarTab from './AppBarTab';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.backgroundColor,
  },
});

const AppBar = () => {
  const authStorage = useContext(AuthStorageContext);
  const { loading, data, error } = useQuery(IS_AUTHORIZED);
  const apolloClient = useApolloClient();

  if (loading) {
    return (
      <View>
        <Text>loading authorization data...</Text>
      </View>
    );
  }

  const authorizedUser = data.authorizedUser;
  //console.log('authorizedUser', authorizedUser);

  const handleSignOut = async () => {
    await authStorage.removeAccessToken();
    apolloClient.resetStore();
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <Link to='/' component={AppBarTab} text='Repositories' />
        {
          authorizedUser === null ?
            <Link to='/signin' component={AppBarTab} text='Sign In' />
            :
            <Link component={AppBarTab} text='Sign Out' onPress={handleSignOut} />
        }
      </ScrollView>
    </View>
  );
};

export default AppBar;
