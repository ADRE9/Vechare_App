export function numberValidator(number) {
  if (!number) {
    return "Phone number can't be empty.";
  } else if (number.length <= 9) {
    return 'Phone number should be 10 digits.';
  }
  return '';
}
