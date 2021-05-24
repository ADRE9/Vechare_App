export function nameValidator(name) {
  if (!name) {
    return "Name can't be empty.";
  } else if (name.length <= 3) {
    return 'Name should be minimum 4 characters.';
  }
  return '';
}
