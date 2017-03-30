import idb from '../utlis/idb';
import executeCallback from '../utlis/executeCallback';

// witodo offline storage
const dbName = 'witodo';

// witodo 2.0
const dbVersion = 1;

// default equal with localforage
const storeName = 'keyvaluepairs';

/**
 * Create a indexeddb connection.
 * @returns A `Promise` object.
 */
function openConnection() {
  return new Promise((reslove, reject) => {
    const req = idb.open(dbName, dbVersion);
    let db;

    req.onupgradeneeded = () => {
      db = req.result;
      if (!db.objectStoreNames.contains(storeName)) {
        db.createObjectStore(storeName);
      }
    };

    req.onsuccess = () => {
      db = req.result;
      reslove(db);
    };

    req.onerror = (error) => {
      reject(error);
    };
  });
}

/**
 * For persisting data.
 */
export default {
  /**
   * Fetches an item for a `key` and invokes a callback upon completion.
   * Returns a `Promise` object.
   * @param {string} key - Key of the item to fetch.
   * @param {function} callback - Function that will be called with a result if found or
   *    any error.
   * @returns A `Promise` object.
   */
  getItem: (key, callback) => {
    if (typeof key !== 'string') {
      console.warn('used as a key, but it is not a string.');
    }

    const promise = new Promise((resolve, reject) => {
      openConnection()
        .then((db) => {
          const transaction = db.transaction([storeName], 'readonly');
          const store = transaction.objectStore(storeName);
          const req = store.get(key);

          req.onsuccess = () => {
            let value = req.result;

            if (value === undefined) {
              value = null;
            }
            resolve(value);
          };

          req.onerror = () => {
            reject(req.error);
          };
        })
        .catch(reject);
    });

    executeCallback(promise, callback);
    return promise;
  },

  /**
   * Sets the value for a `key` and invokes a callback upon completion.
   * Returns a `Promise` object.
   * @param {string} key - Key of the item to set.
   * @param {any} value - Value to set for the `key`.
   * @param {function} callback - Function that will be called with any error.
   * @returns A `Promise` object.
   */
  setItem: (key, value, callback) => {
    if (typeof key !== 'string') {
      console.warn('used as a key, but it is not a string.');
    }

    const promise = new Promise((resolve, reject) => {
      openConnection()
        .then((db) => {
          const transaction = db.transaction([storeName], 'readwrite');
          const store = transaction.objectStore(storeName);
          const req = store.put(value, key);

          req.onsuccess = () => {
            resolve();
          };

          req.onerror = () => {
            reject(req.error);
          };
        })
        .catch(reject);
    });

    executeCallback(promise, callback);
    return promise;
  },

  /**
   * Removes an item for a `key` and invokes a callback upon completion.
   * Returns a `Promise` object.
   * @param {string} key - Key of the item to remove.
   * @param {function} callback - Function that will be called with any error.
   * @returns A `Promise` object.
   */
  removeItem: (key, callback) => {
    if (typeof key !== 'string') {
      console.warn('used as a key, but it is not a string.');
    }

    const promise = new Promise((resolve, reject) => {
      openConnection()
        .then((db) => {
          const transaction = db.transaction([storeName], 'readwrite');
          const store = transaction.objectStore(storeName);
          const req = store.delete(key);

          req.onsuccess = () => {
            resolve();
          };

          req.onerror = () => {
            reject(req.error);
          };
        })
        .catch(reject);
    });

    executeCallback(promise, callback);
    return promise;
  },

  /**
   * Erases *all* `AsyncStorage` for all clients, libraries, etc.  You probably
   * don't want to call this; use `removeItem` or `multiRemove` to clear only
   * your app's keys. Returns a `Promise` object.
   * @param {function} callback - Function that will be called with any error.
   * @returns A `Promise` object.
   */
  clear: (callback) => {
    const promise = new Promise((resolve, reject) => {
      openConnection()
        .then((db) => {
          const transaction = db.transaction([storeName], 'readwrite');
          const store = transaction.objectStore(storeName);
          const req = store.clear();

          req.onsuccess = () => {
            resolve();
          };

          req.onerror = () => {
            reject(req.error);
          };
        })
        .catch(reject);
    });

    executeCallback(promise, callback);
    return promise;
  },

  /**
   * Gets item counts.
   * Returns a `Promise` object.
   * @param {function} callback - Function that will be called the keys found and any error.
   * @returns A `Promise` object.
   */
  length: (callback) => {
    const promise = new Promise((resolve, reject) => {
      openConnection()
        .then((db) => {
          const transaction = db.transaction([storeName], 'readonly');
          const store = transaction.objectStore(storeName);
          const req = store.count();

          req.onsuccess = () => {
            resolve(req.result);
          };

          req.onerror = () => {
            reject(req.error);
          };
        })
        .catch(reject);
    });

    executeCallback(promise, callback);
    return promise;
  },

  /**
   * Gets *all* keys known to your app; for all callers, libraries, etc.
   * Returns a `Promise` object.
   * @param {function} callback - Function that will be called the keys found and any error.
   * @returns A `Promise` object.
   *
   * Example: see the `multiGet` example.
   */
  getAllKeys: (callback) => {
    const promise = new Promise((resolve, reject) => {
      openConnection()
        .then((db) => {
          const transaction = db.transaction([storeName], 'readonly');
          const store = transaction.objectStore(storeName);
          const req = store.openCursor();
          let storedKeys = []; // eslint-disable-line

          req.onsuccess = () => {
            const cursor = req.result;

            if (!cursor) {
              resolve(storedKeys);
              return;
            }

            storedKeys.push(cursor.key);
            cursor.continue();
          };

          req.onerror = () => {
            reject(req.error);
          };
        })
        .catch(reject);
    });

    executeCallback(promise, callback);
    return promise;
  }
};
