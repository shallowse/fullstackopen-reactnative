import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useHistory } from 'react-router-native';
import Text from './Text';

import Constants from 'expo-constants';
import { Link } from 'react-router-native';

import { useQuery, useApolloClient } from '@apollo/react-hooks';
import { IS_AUTHORIZED } from '../graphql/queries';

import { useAuthStorage } from '../contexts/AuthStorageContext';

import AppBarTab from './AppBarTab';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.backgroundColor,
  },
});

const AppBar = () => {
  const authStorage = useAuthStorage();
  const { loading, data } = useQuery(IS_AUTHORIZED, { fetchPolicy: 'cache-and-network' });
  const apolloClient = useApolloClient();
  const history = useHistory();

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
    history.push('/');
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <Link to='/' component={AppBarTab} text='Repositories' />
        {
          authorizedUser === null ?
            <>
              <Link to='/signin' component={AppBarTab} text='Sign in' />
              <Link to='/signup' component={AppBarTab} text='Sign up' />
            </>
            :
            <>
              <Link to='/review' component={AppBarTab} text='Create a review' />
              <Link to='/myreviews' component={AppBarTab} text='My reviews' />
              <Link component={AppBarTab} text='Sign Out' onPress={handleSignOut} />
            </>
        }
      </ScrollView>
    </View>
  );
};

export default AppBar;
