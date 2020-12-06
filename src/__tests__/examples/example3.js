import React, { useState } from 'react';
import { Text, TextInput, TouchableWithoutFeedback, View } from 'react-native';
import { render, fireEvent } from '@testing-library/react-native';

const Form = ({ onSubmit }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    onSubmit({ username, password });
  };

  return (
    <View>
      <View>
        <TextInput
          value={username}
          onChangeText={text => setUsername(text)}
          placeholder='Username'
          testID='usernameField'
        />
      </View>
      <View>
        <TextInput
          value={password}
          onChangeText={text => setPassword(text)}
          placeholder='Password'
          testID='passwordField'
        />
      </View>
      <View>
        <TouchableWithoutFeedback onPress={handleSubmit} testID='submitButton'>
          <Text>Submit</Text>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
};

describe('Form', () => {
  it('calls function provided by onSubmit prop after pressing the submit button', () => {
    const onSubmit = jest.fn();
    const { /*debug,*/ getByTestId } = render(<Form onSubmit={onSubmit} />);

    //debug();

    fireEvent.changeText(getByTestId('usernameField'), 'liisa');
    fireEvent.changeText(getByTestId('passwordField'), 'password');
    fireEvent.press(getByTestId('submitButton'));

    expect(onSubmit).toHaveBeenCalledTimes(1);

    expect(onSubmit.mock.calls[0][0]).toEqual({
      username: 'liisa',
      password: 'password',
    });

  });
});