import React from 'react';
import { Formik } from 'formik';
import { render, fireEvent, waitFor, act } from '@testing-library/react-native';

import { SignInForm } from '../../components/SignIn';

describe('SignIn', () => {
  describe('SignInContainer', () => {
    it('calls onSubmit function with correct arguments when a valid form is submitted', async () => {
      // render the SignInContainer component, fill the text inputs and press the submit button
      const onSubmit = jest.fn();

      const initialValues = {
        username: '',
        password: '',
      };

      const { /*debug,*/ getByTestId } =
        render(
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
          >
            {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
          </Formik>
        );

      //debug();

      await act(async () => {
        await fireEvent.changeText(getByTestId('username'), 'liisa');
      });

      await act(async () => {
        await fireEvent.changeText(getByTestId('password'), 'password');
      });

      await act(async () => {
        await fireEvent.press(getByTestId('submit'));
      });

      await waitFor(() => {
        // expect the onSubmit function to have been called once and with a correct first argument
        expect(onSubmit).toHaveBeenCalledTimes(1);

        expect(onSubmit.mock.calls[0][0]).toEqual({
          username: 'liisa',
          password: 'password',
        });
      });

    });
  });
});