import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import { Link } from 'react-router-native';

import AppBarTab from './AppBarTab';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.backgroundColor,
  },
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <Link to='/' component={AppBarTab} text='Repositories' />
        <Link to='/signin' component={AppBarTab} text='SignIn' />
      </ScrollView>
    </View>
  );
};

export default AppBar;
