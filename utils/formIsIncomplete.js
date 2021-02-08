export default function formIsIncomplete(
  errors,
  emailTouched,
  passwordTouched,
) {
  const notTouched = !emailTouched || !passwordTouched;

  return notTouched || errors.email.length > 0 || errors.password.length > 0;
}
