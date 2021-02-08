import validateEmail from '../validateEmail';

describe('validateEmail', () => {
  test('should return an empty string if touched is false', () => {
    expect(validateEmail('', false)).toBe('');
  });

  test('should return "Email required." if email is empty and touched is true', () => {
    const result = 'Email required.';
    expect(validateEmail('', true)).toBe(result);
  });

  test('shoud return "Please enter a valid email address." if email is invalid', () => {
    const result = 'Please enter a valid email address.';
    expect(validateEmail('johndoe', true)).toBe(result);
  });

  test('should return and empty string if email is valid and touched is true', () => {
    const validEmail = 'johndoe@example.com';
    expect(validateEmail(validEmail, true)).toBe('');
  });
});
