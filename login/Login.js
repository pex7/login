import React, {useEffect, useRef, useState} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {Button, Snackbar, TextInput} from 'react-native-paper';
import {formIsIncomplete, validateEmail, validatePassword} from '../utils';

const initialErrors = {
  email: '',
  password: '',
};

export const apiUrl = 'https://reqres.in/api/login';

const Login = () => {
  const [emailText, setEmailText] = useState('');
  const [emailInputTouched, setEmailInputTouched] = useState(false);
  const [passwordInputTouched, setPasswordInputTouched] = useState(false);
  const [passwordText, setPasswordText] = useState('');
  const [errors, setErrors] = useState(initialErrors);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarText, setSnackbarText] = useState('');
  const emailInputRef = useRef();

  useEffect(() => {
    const emailErrorText = validateEmail(emailText, emailInputTouched);
    const passwordErrorText = validatePassword(
      passwordText,
      passwordInputTouched,
    );
    setErrors({email: emailErrorText, password: passwordErrorText});
  }, [emailText, emailInputTouched, passwordText, passwordInputTouched]);

  const handleEmailInputTouched = () => {
    setEmailInputTouched(true);
  };

  const handlePasswordInputTouched = () => {
    // don't update passwordInputTouched while snackbar is visibile
    // because we need to reset the form state
    if (!snackbarVisible) {
      setPasswordInputTouched(true);
    }
  };

  const handleEmailInputChanged = (newEmailText) => {
    setEmailText(newEmailText);

    !emailInputTouched && setEmailInputTouched(true);
  };

  const handlePasswordInputChanged = (newPasswordText) => {
    setPasswordText(newPasswordText);

    !passwordInputTouched && setPasswordInputTouched(true);
  };

  const onDismissSnackbar = () => {
    setSnackbarVisible(false);
  };

  const handleLogin = async () => {
    try {
      const data = {
        email: emailText,
        password: passwordText,
      };

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const {token, error} = await response.json();

      if (token) {
        emailInputRef.current.focus();
        setEmailText('');
        setEmailInputTouched(false);
        setPasswordText('');
        setPasswordInputTouched(false);
        setSnackbarText('Login successful!');
      }

      if (error) {
        setSnackbarText(`Login unsuccessful: ${error}`);
      }

      setSnackbarVisible(true);
    } catch (e) {
      console.log('e', e);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.headingText}>Please log in below</Text>
        <TextInput
          accessibilityLabel="Email input"
          autoFocus={true}
          error={emailInputTouched && errors.email.length}
          keyboardType="email-address"
          label="Email"
          mode="outlined"
          onBlur={handleEmailInputTouched}
          onChangeText={handleEmailInputChanged}
          ref={emailInputRef}
          textContentType="emailAddress"
          value={emailText}
        />
        <Text style={styles.errorText}>{errors.email}</Text>
        <TextInput
          accessibilityLabel="Password input"
          error={passwordInputTouched && errors.password.length}
          label="Password"
          mode="outlined"
          onBlur={handlePasswordInputTouched}
          onChangeText={handlePasswordInputChanged}
          secureTextEntry={true}
          textContentType="password"
          value={passwordText}
        />
        <Text style={styles.errorText}>{errors.password}</Text>
        <Button
          accessibilityLabel="Log in button"
          disabled={formIsIncomplete(
            errors,
            emailInputTouched,
            passwordInputTouched,
          )}
          mode="contained"
          onPress={handleLogin}
          labelStyle={styles.loginButtonText}
          style={styles.loginButton}>
          Log in
        </Button>
      </View>
      <View style={styles.snackbarContainer}>
        <Snackbar
          visible={snackbarVisible}
          onDismiss={onDismissSnackbar}
          duration={2000}>
          {snackbarText}
        </Snackbar>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  formContainer: {
    flex: 2,
    justifyContent: 'flex-end',
  },
  errorText: {
    color: '#B00020',
    marginTop: 4,
    marginBottom: 8,
  },
  headingText: {
    fontSize: 24,
    marginBottom: 16,
  },
  loginButton: {
    alignSelf: 'flex-end',
    marginTop: 8,
  },
  loginButtonText: {
    fontSize: 16,
    color: 'white',
  },
  snackbarContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
});

export default Login;
