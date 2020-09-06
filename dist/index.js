(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("bpd-storage", [], factory);
	else if(typeof exports === 'object')
		exports["bpd-storage"] = factory();
	else
		root["bpd-storage"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BpdStorage", function() { return BpdStorage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BpdValidationError", function() { return BpdValidationError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BpdUnknownStorageOption", function() { return BpdUnknownStorageOption; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BpdUnknownStorageItemType", function() { return BpdUnknownStorageItemType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BpdStorageUnavailable", function() { return BpdStorageUnavailable; });
var __classPrivateFieldSet = (undefined && undefined.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var __classPrivateFieldGet = (undefined && undefined.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _handler, _name, _storage, _type, _throwValidation;
class BpdStorage {
    constructor(type, name) {
        _handler.set(this, void 0);
        _name.set(this, void 0);
        __classPrivateFieldSet(this, _handler, new StorageHandler(type));
        __classPrivateFieldSet(this, _name, this.isString(name) ? name : "");
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
                return null;
        }
    }
    testStorage() {
        try {
            var x = '__storage_test__';
            __classPrivateFieldGet(this, _storage).setItem(x, x);
            __classPrivateFieldGet(this, _storage).removeItem(x);
            return true;
        }
        catch (e) {
            return false;
        }
    }
    count() {
        return __classPrivateFieldGet(this, _storage).length;
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
        if (val)
            __classPrivateFieldGet(this, _storage).setItem(key, val);
        else {
            throw new BpdUnknownStorageItemType("Unknown item type or empty value was provided");
        }
    }
    getString(key) {
        if (!this.validateKey(key)) {
            return null;
        }
        return __classPrivateFieldGet(this, _storage).getItem(key);
    }
    getNumber(key) {
        if (!this.validateKey(key)) {
            return null;
        }
        return parseInt(this.getString(key));
    }
    getAny(key) {
        console.log("et " + key);
        if (!this.validateKey(key)) {
            return null;
        }
        return JSON.parse(this.getString(key));
    }
    getBoolean(key) {
        if (!this.validateKey(key)) {
            return null;
        }
        return this.getString(key) === 'true';
    }
    getArray(key) {
        if (!this.validateKey(key)) {
            return null;
        }
        return this.getString(key).split(';');
    }
    has(key) {
        if (!this.validateKey(key)) {
            return false;
        }
        return __classPrivateFieldGet(this, _storage).getItem(key) !== null;
    }
    clear() {
        __classPrivateFieldGet(this, _storage).clear();
    }
    get() {
        return __classPrivateFieldGet(this, _storage);
    }
    remove(key) {
        __classPrivateFieldGet(this, _storage).removeItem(key);
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
class BpdValidationError extends BpdError {
    constructor(message) {
        super("BpdValidationError",  true ? ": " + message : undefined);
    }
}
class BpdUnknownStorageOption extends BpdError {
    constructor(message) {
        super("BpdUnknownStorageOption", message);
    }
}
class BpdUnknownStorageItemType extends BpdError {
    constructor(message) {
        super("BpdUnknownStorageItemType", message);
    }
}
class BpdStorageUnavailable extends BpdError {
    constructor(message) {
        super("BpdStorageUnavailable", message);
    }
}


/***/ })
/******/ ]);
});