import React from 'react';
import { TouchableWithoutFeedback, View, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useHistory } from 'react-router-native';

import Text from './Text';
import FormikTextInput from './FormikTextInput';

import useSignUp from '../hooks/useSignUp';

import theme from '../theme';

const initialValues = {
  username: '',
  password: '',
  passwordConfirm: '',
};

// https://github.com/formium/formik/issues/90#issuecomment-354873201
const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(1, 'Must be minimum of 1 character')
    .max(100, 'Must be maximum of 30 characters')
    .required('Username is required'),
  password: yup
    .string()
    .min(5, 'Must be minimum of 5 characters')
    .max(50, 'Must be maximum of 50 characters')
    .required('Password is required'),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref('password'), null])
    .required('Password confirmation is required'),
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
  },
});

const SignUpForm = ({ onSubmit }) => {
  return (
    <View style={formStyles.container}>
      <FormikTextInput
        name='username'
        placeholder='Username'
      />

      <FormikTextInput
        name='password'
        placeholder='Password'
        secureTextEntry
      />

      <FormikTextInput
        name='passwordConfirm'
        placeholder='Password confirmation'
        secureTextEntry
      />

      <TouchableWithoutFeedback onPress={onSubmit}>
        <Text fontWeight='bold' fontSize='subheading' style={formStyles.button}>
          Sign Up
        </Text>
      </TouchableWithoutFeedback>
    </View>
  );
};

const SignUp = () => {
  const [signUp] = useSignUp();
  const history = useHistory();

  const onSubmit = async (values) => {
    //console.log('SignUp :: values', values);
    const { username, password } = values;
    try {
      await signUp({ username, password });
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
      {({ handleSubmit }) => <SignUpForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default SignUp;