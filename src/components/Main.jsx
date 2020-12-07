import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Route, Switch, Redirect } from 'react-router-native';

import AppBar from './AppBar';
import RepositoryList from './RepositoryList';
import RepositoryItemSingle from './RepositoryItemSingle';
import SignIn from './SignIn';
import SignUp from './SignUp';
import Review from './Review';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#e1e4e8',
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Switch>
        <Route exact path='/' component={RepositoryList} />
        <Route exact path='/signin' component={SignIn} />
        <Route exact path='/signup' component={SignUp} />
        <Route exact path='/review' component={Review} />
        <Route exact path='/:id' component={RepositoryItemSingle} />
        <Redirect to='/' />
      </Switch>
    </View>
  );
};

export default Main;
