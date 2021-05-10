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
class BpdStorage {
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