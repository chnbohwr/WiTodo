function getIDB() {
  /* global indexedDB,webkitIndexedDB,mozIndexedDB,OIndexedDB,msIndexedDB */
  try {
    if (typeof indexedDB !== 'undefined') {
      return indexedDB;
    }
    if (typeof webkitIndexedDB !== 'undefined') {
      return webkitIndexedDB;
    }
    if (typeof mozIndexedDB !== 'undefined') {
      return mozIndexedDB;
    }
    if (typeof OIndexedDB !== 'undefined') {
      return OIndexedDB;
    }
    if (typeof msIndexedDB !== 'undefined') {
      return msIndexedDB;
    }
    return null;
  } catch (err) {
    throw new Error(err);
  }
}

const idb = getIDB();
export default idb;
