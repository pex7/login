import formIsIncomplete from '../formIsIncomplete';

describe('formIsIncomplete', () => {
  test('should return true if it has an email error', () => {
    const errors = {
      email: 'Email required',
      password: '',
    };

    expect(formIsIncomplete(errors, true, true)).toBe(true);
  });

  test('should return true if it has an password error', () => {
    const errors = {
      email: '',
      password: 'Password required',
    };

    expect(formIsIncomplete(errors, true, true)).toBe(true);
  });

  test('should return true if emailTouched or passwordTouched is false', () => {
    const errors = {
      email: '',
      password: '',
    };

    expect.assertions(2);

    expect(formIsIncomplete(errors, false, true)).toBe(true);
    expect(formIsIncomplete(errors, true, false)).toBe(true);
  });

  test('should return false if there are no errors and all fields have been touched', () => {
    const errors = {
      email: '',
      password: '',
    };

    expect(formIsIncomplete(errors, true, true)).toBe(false);
  });
});
