/* eslint-disable */

export class LocalStorage {

  constructor() {
    this.EXT_ID = 'joclhplojgcocgecaioibgknjlbkmnff';
  }

  set(value) {
    Object.keys(value).forEach(key => {
      let item = value[key];
      
      if (typeof item != 'string') {
        item = JSON.stringify(item);
      }

      window.localStorage.setItem(key, item);
    });
  }

  get(key) {
    let result = {};
    let item = window.localStorage.getItem(key);

    if (!item) {
      return {};
    }

    try {
      result[key] = JSON.parse(item);
    } catch(err) {
      result[key] = item;
    }

    return result;
  }

  getAll() {
    let data = {};

    for(var i = 0; i < window.localStorage.length; i++) {
      let key = window.localStorage.key(i);
      data = Object.assign(data, this.get(key));
    }

    return data;
  }

  clear() {
    return window.localStorage.clear();
  }

}

export class BrowserStorage {

  constructor() {
    this.EXT_ID = window.chrome.runtime.id;
  }

  set(value) {
    return new Promise(resolve => {
      window.chrome.storage.local.set(value, resolve);
    });
  }

  get(keys) {
    return new Promise(resolve => {
      window.chrome.storage.local.get(keys, resolve);
    });
  }

  getAll() {
    return new Promise(resolve => {
      window.chrome.storage.local.get(null, items => {
        resolve(items);
      });
    });
  }

  clear() {
    return new Promise(StorageArea.clear);
  }

}

export default () => {
  if (process.env.NODE_ENV == 'development') {
    return new LocalStorage();
  } else {
    return new BrowserStorage();
  }
}
