// regex from https://sigparser.com/developers/email-parsing/regex-validate-email-address/
const pattern = new RegExp(/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/);

export default function isValidEmail(testEmail) {
  return pattern.test(testEmail);
}
