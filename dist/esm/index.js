var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _handler, _name, _storage, _type, _throwValidation;
export class BpdStorage {
    constructor(type, name = "") {
        _handler.set(this, void 0);
        _name.set(this, void 0);
        __classPrivateFieldSet(this, _handler, new StorageHandler(type));
        __classPrivateFieldSet(this, _name, name);
    }
    throwValidationErrors(flag) {
        __classPrivateFieldGet(this, _handler).setThrowValidation(flag);
    }
    get() {
        return __classPrivateFieldGet(this, _handler).get();
    }
    removeItem(key) {
        __classPrivateFieldGet(this, _handler).remove(this.getKey(key));
    }
    clear() {
        __classPrivateFieldGet(this, _handler).clear();
    }
    isAccessible() {
        return __classPrivateFieldGet(this, _handler).testStorage();
    }
    length() {
        return __classPrivateFieldGet(this, _handler).count();
    }
    getItem(key) {
        return __classPrivateFieldGet(this, _handler).getString(this.getKey(key));
    }
    getNumber(key) {
        return __classPrivateFieldGet(this, _handler).getNumber(this.getKey(key));
    }
    getBoolean(key) {
        return __classPrivateFieldGet(this, _handler).getBoolean(this.getKey(key));
    }
    getAny(key) {
        return __classPrivateFieldGet(this, _handler).getAny(this.getKey(key));
    }
    getArray(key) {
        return __classPrivateFieldGet(this, _handler).getArray(this.getKey(key));
    }
    has(key) {
        return __classPrivateFieldGet(this, _handler).has(this.getKey(key));
    }
    setItem(key, value) {
        __classPrivateFieldGet(this, _handler).set(this.getKey(key), value, 'string');
    }
    setNumber(key, value) {
        __classPrivateFieldGet(this, _handler).set(this.getKey(key), value, 'number');
    }
    setBoolean(key, value) {
        __classPrivateFieldGet(this, _handler).set(this.getKey(key), value, 'boolean');
    }
    setAny(key, value) {
        __classPrivateFieldGet(this, _handler).set(this.getKey(key), value, 'object');
    }
    setArray(key, value) {
        __classPrivateFieldGet(this, _handler).set(this.getKey(key), value, 'array');
    }
    getKey(key) {
        if (this.isString(key))
            return __classPrivateFieldGet(this, _name) + "_" + key;
        return key;
    }
    isString(val) {
        return typeof val === 'string' && val.length > 0;
    }
}
_handler = new WeakMap(), _name = new WeakMap();
class StorageHandler {
    constructor(type, throwValidation) {
        _storage.set(this, void 0);
        _type.set(this, void 0);
        _throwValidation.set(this, void 0);
        __classPrivateFieldSet(this, _throwValidation, throwValidation !== null && throwValidation !== void 0 ? throwValidation : false);
        __classPrivateFieldSet(this, _type, type);
        __classPrivateFieldSet(this, _storage, this.getStorage(type));
        if (!__classPrivateFieldGet(this, _storage)) {
            throw new BpdUnknownStorageOption(`Unknown storage: [${type}]`);
        }
        if (!this.testStorage()) {
            throw new BpdStorageUnavailable(`Access to storage [${type}] is denied`);
        }
    }
    setThrowValidation(flag) {
        __classPrivateFieldSet(this, _throwValidation, flag);
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
            if (__classPrivateFieldGet(this, _storage)) {
                var x = '__storage_test__';
                __classPrivateFieldGet(this, _storage).setItem(x, x);
                __classPrivateFieldGet(this, _storage).removeItem(x);
                return true;
            }
        }
        catch (e) {
            return false;
        }
        return false;
    }
    count() {
        return __classPrivateFieldGet(this, _storage) ? __classPrivateFieldGet(this, _storage).length : -1;
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
        if (val && __classPrivateFieldGet(this, _storage))
            __classPrivateFieldGet(this, _storage).setItem(key, val);
        else {
            throw new BpdUnknownStorageItemType("Unknown item type or empty value was provided");
        }
    }
    getString(key) {
        if (!this.validateKey(key) || !__classPrivateFieldGet(this, _storage)) {
            return undefined;
        }
        let item = __classPrivateFieldGet(this, _storage).getItem(key);
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
        return __classPrivateFieldGet(this, _storage) ? __classPrivateFieldGet(this, _storage).getItem(key) !== null : false;
    }
    clear() {
        if (__classPrivateFieldGet(this, _storage)) {
            __classPrivateFieldGet(this, _storage).clear();
        }
    }
    get() {
        return __classPrivateFieldGet(this, _storage);
    }
    remove(key) {
        if (__classPrivateFieldGet(this, _storage)) {
            __classPrivateFieldGet(this, _storage).removeItem(key);
        }
    }
    validateKey(key) {
        let is = key !== null && key.length > 0;
        if (!is) {
            if (__classPrivateFieldGet(this, _throwValidation)) {
                throw new BpdValidationError("property key was empty");
            }
            return false;
        }
        return true;
    }
}
_storage = new WeakMap(), _type = new WeakMap(), _throwValidation = new WeakMap();
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
