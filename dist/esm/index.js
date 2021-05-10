export class BpdStorage {
    constructor(type, name = "") {
        this._handler = new StorageHandler(type);
        this._name = name;
    }
    throwValidationErrors(flag) {
        this._handler.setThrowValidation(flag);
    }
    get() {
        return this._handler.get();
    }
    removeItem(key) {
        this._handler.remove(this.getKey(key));
    }
    clear() {
        this._handler.clear();
    }
    isAccessible() {
        return this._handler.testStorage();
    }
    length() {
        return this._handler.count();
    }
    getItem(key) {
        return this._handler.getString(this.getKey(key));
    }
    getNumber(key) {
        return this._handler.getNumber(this.getKey(key));
    }
    getBoolean(key) {
        return this._handler.getBoolean(this.getKey(key));
    }
    getAny(key) {
        return this._handler.getAny(this.getKey(key));
    }
    getArray(key) {
        return this._handler.getArray(this.getKey(key));
    }
    has(key) {
        return this._handler.has(this.getKey(key));
    }
    setItem(key, value) {
        this._handler.set(this.getKey(key), value, 'string');
    }
    setNumber(key, value) {
        this._handler.set(this.getKey(key), value, 'number');
    }
    setBoolean(key, value) {
        this._handler.set(this.getKey(key), value, 'boolean');
    }
    setAny(key, value) {
        this._handler.set(this.getKey(key), value, 'object');
    }
    setArray(key, value) {
        this._handler.set(this.getKey(key), value, 'array');
    }
    getKey(key) {
        if (this.isString(key))
            return this._name + "_" + key;
        return key;
    }
    isString(val) {
        return typeof val === 'string' && val.length > 0;
    }
}
class StorageHandler {
    constructor(type, throwValidation) {
        this._throwValidation = throwValidation !== null && throwValidation !== void 0 ? throwValidation : false;
        this._storage = this.getStorage(type);
        if (!this._storage) {
            throw new BpdUnknownStorageOption(`Unknown storage: [${type}]`);
        }
        if (!this.testStorage()) {
            throw new BpdStorageUnavailable(`Access to storage [${type}] is denied`);
        }
    }
    setThrowValidation(flag) {
        this._throwValidation = flag;
    }
    getStorage(type) {
        switch (type) {
            case 'local':
                return window.localStorage;
            case 'session':
                return window.sessionStorage;
            default:
                return undefined;
        }
    }
    testStorage() {
        try {
            if (this._storage) {
                var x = '__storage_test__';
                this._storage.setItem(x, x);
                this._storage.removeItem(x);
                return true;
            }
        }
        catch (e) {
            return false;
        }
        return false;
    }
    count() {
        return this._storage ? this._storage.length : -1;
    }
    set(key, value, type) {
        if (!this.validateKey(key)) {
            return;
        }
        let val = null;
        switch (type) {
            case 'string':
            case 'number':
                val = value;
                break;
            case 'boolean':
                let isTrue = value && ['yes', 'y', 't', 'true'].includes(value.toLowerCase());
                val = `${isTrue}`;
                break;
            case 'object':
                val = JSON.stringify(value);
                break;
            case 'array':
                val = value.join(";");
                break;
        }
        if (val && this._storage)
            this._storage.setItem(key, val);
        else {
            throw new BpdUnknownStorageItemType("Unknown item type or empty value was provided");
        }
    }
    getString(key) {
        if (!this.validateKey(key) || !this._storage) {
            return undefined;
        }
        let item = this._storage.getItem(key);
        return item !== null ? item : undefined;
    }
    getNumber(key) {
        if (!this.validateKey(key)) {
            return undefined;
        }
        let item = this.getString(key);
        return item ? parseInt(item) : undefined;
    }
    getAny(key) {
        if (!this.validateKey(key)) {
            return undefined;
        }
        let item = this.getString(key);
        return item ? JSON.parse(item) : undefined;
    }
    getBoolean(key) {
        if (!this.validateKey(key)) {
            return false;
        }
        return this.getString(key) === 'true';
    }
    getArray(key) {
        if (!this.validateKey(key)) {
            return undefined;
        }
        let item = this.getString(key);
        return item ? item.split(';') : undefined;
    }
    has(key) {
        if (!this.validateKey(key)) {
            return false;
        }
        return this._storage ? this._storage.getItem(key) !== null : false;
    }
    clear() {
        if (this._storage) {
            this._storage.clear();
        }
    }
    get() {
        return this._storage;
    }
    remove(key) {
        if (this._storage) {
            this._storage.removeItem(key);
        }
    }
    validateKey(key) {
        let is = key !== null && key.length > 0;
        if (!is) {
            if (this._throwValidation) {
                throw new BpdValidationError("property key was empty");
            }
            return false;
        }
        return true;
    }
}
class BpdError extends Error {
    constructor(name, message) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = name;
    }
}
export class BpdValidationError extends BpdError {
    constructor(message) {
        super("BpdValidationError", "Incorrect value was passed" + message ? ": " + message : "");
    }
}
export class BpdUnknownStorageOption extends BpdError {
    constructor(message) {
        super("BpdUnknownStorageOption", message);
    }
}
export class BpdUnknownStorageItemType extends BpdError {
    constructor(message) {
        super("BpdUnknownStorageItemType", message);
    }
}
export class BpdStorageUnavailable extends BpdError {
    constructor(message) {
        super("BpdStorageUnavailable", message);
    }
}
