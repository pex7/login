export default function validatePassword(testPassword, touched) {
  if (!touched) {
    return '';
  }

  if (!testPassword.length) {
    return 'Password required.';
  }

  return '';
}
