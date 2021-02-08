import validatePassword from '../validatePassword';

describe('validatePassword', () => {
  test('should return an empty string if touched is false', () => {
    expect(validatePassword('', false)).toBe('');
  });

  test('should return "Password required." if password is empty and touched is true', () => {
    const result = 'Password required.';
    expect(validatePassword('', true)).toBe(result);
  });

  test('should return an empty string if password is not empty and touched is true', () => {
    expect(validatePassword('12345', true)).toBe('');
  });
});
