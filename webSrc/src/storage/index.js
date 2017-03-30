import { indexeddb } from './drivers';

export const drivers = {
  INDEXEDDB: indexeddb,
  LOCALSTORAGE: null,
  WEBSQL: null
};

const defaultDriverOrder = [
  drivers.INDEXEDDB,
  drivers.WEBSQL,
  drivers.LOCALSTORAGE
];

class Storage {
  constructor() {
    this._driver = defaultDriverOrder.shift();
    this.INDEXEDDB = drivers.INDEXEDDB;
    this.LOCALSTORAGE = drivers.LOCALSTORAGE;
    this.WEBSQL = drivers.WEBSQL;
  }

  setDriver(driver) {
    this._driver = driver;
  }

  driver() {
    return this._driver;
  }

  getItem(key, callback) {
    return this._driver.getItem(key, callback);
  }

  setItem(key, value, callback) {
    return this._driver.setItem(key, value, callback);
  }

  removeItem(key, callback) {
    return this._driver.removeItem(key, callback);
  }

  clear(callback) {
    return this._driver.clear(callback);
  }

  length(callback) {
    return this._driver.length(callback);
  }

  getAllKeys(callback) {
    return this._driver.getAllKeys(callback);
  }
}

export default new Storage();
