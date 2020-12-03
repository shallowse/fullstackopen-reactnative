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

const AppBarTab = ({ text, onPress }) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <Text fontWeight='bold' fontSize='subheading' style={styles.element} >
        {text}
      </Text>
    </TouchableWithoutFeedback>
  );
};

export default AppBarTab;
