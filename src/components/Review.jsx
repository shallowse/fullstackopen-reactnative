import React from 'react';
import { TouchableWithoutFeedback, View, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useHistory } from 'react-router-native';

import useReview from '../hooks/useReview';

import Text from './Text';
import FormikTextInput from './FormikTextInput';

import theme from '../theme';

const initialValues = {
  ownerName: '',
  repositoryName: '',
  rating: '',
  text: '',
};

const validationSchema = yup.object().shape({
  ownerName: yup
    .string()
    .required('Repository owner name is required'),
  repositoryName: yup
    .string()
    .required('Repository name is required'),
  rating: yup
    .number()
    .min(0)
    .max(100)
    .required('Rating is required'),
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

const ReviewForm = ({ onSubmit }) => {
  return (
    <View style={formStyles.container}>
      <FormikTextInput
        name='ownerName'
        placeholder='Repository owner name'
      />

      <FormikTextInput
        name='repositoryName'
        placeholder='Repository name'
      />

      <FormikTextInput
        name='rating'
        placeholder='Rating between 0 and 100'
      />

      <FormikTextInput
        name='text'
        placeholder='Review'
      />

      <TouchableWithoutFeedback onPress={onSubmit}>
        <Text fontWeight='bold' fontSize='subheading' style={formStyles.button}>Create a review</Text>
      </TouchableWithoutFeedback>
    </View>
  );
};

const Review = () => {
  const [createReview] = useReview();
  const history = useHistory();

  const onSubmit = async (values) => {
    //console.log('Review :: received', values);
    const { ownerName, repositoryName, text } = values;
    const rating = Number(values.rating);
    try {
      const id = await createReview({ownerName, repositoryName, rating, text});
      //console.log('Review :: id', id);
      history.push(`/${id.createReview.repository.id}`);
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
      {({ handleSubmit }) => <ReviewForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default Review;