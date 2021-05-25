export function msgValidator(msg) {
  if (!msg) {
    return "message can't be empty.";
  } else if (msg.length <= 5) {
    return 'message should be minimum 5 characters.';
  }
  return '';
}
