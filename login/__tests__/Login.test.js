import React from 'react';
import {fireEvent, render} from '@testing-library/react-native';
import '@testing-library/jest-native/extend-expect';
import Login, {apiUrl} from '../Login';
import {act} from 'react-test-renderer';

describe('Login', () => {
  test('login button is disabled if the form did not pass validation', () => {
    const onEmailEventMock = jest.fn();
    const onPasswordEventMock = jest.fn();
    const {getByLabelText} = render(
      <Login
        handleEmailInputChanged={onEmailEventMock}
        handlePasswordInputChanged={onPasswordEventMock}
      />,
    );
    const loginButton = getByLabelText('Log in button');
    fireEvent(getByLabelText('Email input'), 'onChangeText', 'abc');
    expect(loginButton).toBeDisabled();
  });

  test('login button is not disabled if the form passes validation', () => {
    const onEmailEventMock = jest.fn();
    const onPasswordEventMock = jest.fn();
    const {getByLabelText} = render(
      <Login
        handleEmailInputChanged={onEmailEventMock}
        handlePasswordInputChanged={onPasswordEventMock}
      />,
    );
    const loginButton = getByLabelText('Log in button');
    fireEvent(
      getByLabelText('Email input'),
      'onChangeText',
      'knownuser@test.com',
    );
    fireEvent(getByLabelText('Password input'), 'onChangeText', '12345');
    expect(loginButton).not.toBeDisabled();
  });

  test('successful login launches snackbar with "Login successful!"', async () => {
    const data = {
      email: 'knownuser@test.com',
      password: '12345',
    };
    const onEmailEventMock = jest.fn();
    const onPasswordEventMock = jest.fn();
    const {getByText, getByLabelText} = render(
      <Login
        handleEmailInputChanged={onEmailEventMock}
        handlePasswordInputChanged={onPasswordEventMock}
      />,
    );

    jest.useFakeTimers();

    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => ({token: 'xyz'}),
    });

    fireEvent(
      getByLabelText('Email input'),
      'onChangeText',
      'knownuser@test.com',
    );
    fireEvent(getByLabelText('Password input'), 'onChangeText', '12345');
    await act(async () =>
      fireEvent(getByLabelText('Log in button'), 'onPress'),
    );

    expect(global.fetch).toHaveBeenCalledWith(
      apiUrl,
      expect.objectContaining({
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }),
    );
    expect(getByText('Login successful!')).toBeTruthy();
  });

  test('unsuccessful login launches snackbar with "Login unsuccessful: user not found"', async () => {
    const data = {
      email: 'unknownuser@test.com',
      password: '12345',
    };
    const onEmailEventMock = jest.fn();
    const onPasswordEventMock = jest.fn();
    const {getByText, getByLabelText} = render(
      <Login
        handleEmailInputChanged={onEmailEventMock}
        handlePasswordInputChanged={onPasswordEventMock}
      />,
    );

    jest.useFakeTimers();

    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => ({error: 'user not found'}),
    });

    fireEvent(
      getByLabelText('Email input'),
      'onChangeText',
      'unknownuser@test.com',
    );
    fireEvent(getByLabelText('Password input'), 'onChangeText', '12345');
    await act(async () =>
      fireEvent(getByLabelText('Log in button'), 'onPress'),
    );

    expect(global.fetch).toHaveBeenCalledWith(
      apiUrl,
      expect.objectContaining({
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }),
    );
    expect(getByText('Login unsuccessful: user not found')).toBeTruthy();
  });
});
