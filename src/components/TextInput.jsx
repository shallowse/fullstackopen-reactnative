import React from 'react';
import { TextInput as NativeTextInput, StyleSheet } from 'react-native';

import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 15,
    fontSize: theme.fontSizes.subheading,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'lightgray',
    marginTop: 20,
    marginBottom: 10,
    marginLeft: 5,
    marginRight: 5,
  },
  error: {
    borderColor: theme.colors.errorColor,
  }

});

const TextInput = ({style, error, ...props}) => {
  const textInputStyle = [style, styles.container];
  if (error) {
    textInputStyle.push(styles.error);
  }

  return <NativeTextInput style={textInputStyle} {...props} />;
};

export default TextInput;
