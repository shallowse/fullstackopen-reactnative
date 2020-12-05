import React from 'react';
import { TouchableWithoutFeedback, View, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useHistory } from 'react-router-native';

import Text from './Text';
import FormikTextInput from './FormikTextInput';

import useSignIn from '../hooks/useSignIn';

import theme from '../theme';

const initialValues = {
  username: '',
  password: '',
};

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(4, 'Must be minimum of 4 characters')
    .required('Username is required'),
  password: yup
    .string()
    .min(5, 'Must be miminum of 5 characters')
    .required('Password is required'),
});

const formStyles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  button: {
    flexGrow: 1,
    padding: 15,
    backgroundColor: theme.colors.primary,
    borderRadius: 5,
    color: 'white',
    marginTop: 20,
    marginBottom: 10,
    marginLeft: 5,
    marginRight: 5,
    textAlign: 'center',
  }
});

const SignInForm = ({ onSubmit }) => {
  return (
    <View style={formStyles.container}>
      <FormikTextInput name='username' placeholder='Username' />
      <FormikTextInput name='password' placeholder='Password' secureTextEntry />
      <TouchableWithoutFeedback onPress={onSubmit}>
        <Text fontWeight='bold' fontSize='subheading' style={formStyles.button}>Sign in</Text>
      </TouchableWithoutFeedback>
    </View>
  );
};

const SignIn = () => {
  const [signIn] = useSignIn();
  const history = useHistory();

  const onSubmit = async (values) => {
    const { username, password } = values;
    try {
      await signIn({ username, password });
      history.push('/');
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default SignIn;
