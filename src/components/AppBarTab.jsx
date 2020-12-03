import React from 'react';
import { StyleSheet, TouchableWithoutFeedback } from 'react-native';

import Text from './Text';

const styles = StyleSheet.create({
  element: {
    color: 'white',
    padding: 10,
    paddingBottom: 15,
  }
});

const AppBarTab = (props) => {
  return (
    <TouchableWithoutFeedback>
      <Text fontWeight='bold' fontSize='subheading' style={styles.element} >
        {props.children}
      </Text>
    </TouchableWithoutFeedback>
  );
};

export default AppBarTab;
