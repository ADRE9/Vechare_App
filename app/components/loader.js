export default class loader {
  static load(cb) {
    setTimeout(cb, 2000);
  }
  static loading(cb) {
    setTimeout(cb, 3000);
  }
}
