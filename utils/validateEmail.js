import isValidEmail from './isValidEmail';

export default function validateEmail(testEmail, touched) {
  if (!touched) {
    return '';
  }

  if (!testEmail.length) {
    return 'Email required.';
  }

  if (!isValidEmail(testEmail)) {
    return 'Please enter a valid email address.';
  }

  return '';
}
