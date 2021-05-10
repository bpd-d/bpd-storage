export type BpdStorageItemType = 'string' | 'boolean' | 'number' | 'object' | 'array'
export type BpdStorageType = 'local' | 'session';

export interface IBpdStorage {
    getItem(key: string): string | undefined;
    getNumber(key: string): number | undefined;
    getBoolean(key: string): boolean;
    getAny(key: string): any | undefined;
    getArray(key: string): string[] | undefined;
    has(key: string): boolean;
    setItem(key: string, value: any): void;
    setNumber(key: string, value: any): void;
    setBoolean(key: string, value: any): void;
    setAny(key: string, value: any): void;
    setArray(key: string, value: any): void;
    isAccessible(): boolean;
    length(): number;
    removeItem(key: string): void;
    clear(): void
    get(): Storage | undefined;
    throwValidationErrors(flag: boolean): void;
}

export class BpdStorage implements IBpdStorage {
    private _handler: StorageHandler;
    private _name: string;
    constructor(type: BpdStorageType, name: string = "") {
        this._handler = new StorageHandler(type);
        this._name = name;
    }

    throwValidationErrors(flag: boolean): void {
        this._handler.setThrowValidation(flag);
    }

    get(): Storage | undefined {
        return this._handler.get();
    }

    removeItem(key: string): void {
        this._handler.remove(this.getKey(key));
    }

    clear(): void {
        this._handler.clear();
    }

    isAccessible(): boolean {
        return this._handler.testStorage();
    }

    length(): number {
        return this._handler.count();
    }

    getItem(key: string): string | undefined {
        return this._handler.getString(this.getKey(key));
    }

    getNumber(key: string): number | undefined {
        return this._handler.getNumber(this.getKey(key));
    }

    getBoolean(key: string): boolean {
        return this._handler.getBoolean(this.getKey(key));
    }

    getAny(key: string): any | undefined {
        return this._handler.getAny(this.getKey(key));
    }

    getArray(key: string): string[] | undefined {
        return this._handler.getArray(this.getKey(key));
    }

    has(key: string): boolean {
        return this._handler.has(this.getKey(key));
    }

    setItem(key: string, value: any): void {
        this._handler.set(this.getKey(key), value, 'string');
    }

    setNumber(key: string, value: any): void {
        this._handler.set(this.getKey(key), value, 'number');
    }

    setBoolean(key: string, value: any): void {
        this._handler.set(this.getKey(key), value, 'boolean');
    }

    setAny(key: string, value: any): void {
        this._handler.set(this.getKey(key), value, 'object');
    }

    setArray(key: string, value: any): void {
        this._handler.set(this.getKey(key), value, 'array');
    }

    private getKey(key: string) {
        if (this.isString(key))
            return this._name + "_" + key;
        return key;
    }

    private isString(val: string): boolean {
        return typeof val === 'string' && val.length > 0;
    }
}

class StorageHandler {
    _storage: Storage | undefined;
    _throwValidation: boolean
    constructor(type: BpdStorageType, throwValidation?: boolean) {
        this._throwValidation = throwValidation ?? false;
        this._storage = this.getStorage(type);
        if (!this._storage) {
            throw new BpdUnknownStorageOption(`Unknown storage: [${type}]`)
        }
        if (!this.testStorage()) {
            throw new BpdStorageUnavailable(`Access to storage [${type}] is denied`)
        }
    }

    setThrowValidation(flag: boolean) {
        this._throwValidation = flag;
    }

    getStorage(type: BpdStorageType): Storage | undefined {
        switch (type) {
            case 'local':
                return window.localStorage;
            case 'session':
                return window.sessionStorage;
            default:
                return undefined;
        }
    }

    testStorage(): boolean {
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

    count(): number {
        return this._storage ? this._storage.length : -1;
    }

    set(key: string, value: any, type: BpdStorageItemType): void {
        if (!this.validateKey(key)) {
            return;
        }
        let val = null
        switch (type) {
            case 'string':
            case 'number':
                val = value;
                break;
            case 'boolean':
                let isTrue = value && ['yes', 'y', 't', 'true'].includes(value.toLowerCase())
                val = `${isTrue}`
                break;
            case 'object':
                val = JSON.stringify(value)
                break;
            case 'array':
                val = value.join(";");
                break;
        }
        if (val && this._storage)
            this._storage.setItem(key, val);
        else {
            throw new BpdUnknownStorageItemType("Unknown item type or empty value was provided")
        }
    }

    getString(key: string): string | undefined {
        if (!this.validateKey(key) || !this._storage) {
            return undefined;
        }
        let item = this._storage.getItem(key)
        return item !== null ? item : undefined;
    }

    getNumber(key: string): number | undefined {
        if (!this.validateKey(key)) {
            return undefined;
        }
        let item = this.getString(key);
        return item ? parseInt(item) : undefined;
    }

    getAny(key: string): any | undefined {
        if (!this.validateKey(key)) {
            return undefined;
        }

        let item = this.getString(key);
        return item ? JSON.parse(item) : undefined;
    }

    getBoolean(key: string): boolean {
        if (!this.validateKey(key)) {
            return false;
        }
        return this.getString(key) === 'true';
    }

    getArray(key: string): any[] | undefined {
        if (!this.validateKey(key)) {
            return undefined;
        }
        let item = this.getString(key);
        return item ? item.split(';') : undefined;
    }

    has(key: string): boolean {
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

    get(): Storage | undefined {
        return this._storage;
    }

    remove(key: string) {
        if (this._storage) {
            this._storage.removeItem(key);
        }

    }

    validateKey(key: string): boolean {
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
    constructor(name: string, message?: string) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = name;
    }
}

export class BpdValidationError extends BpdError {
    constructor(message?: string) {
        super("BpdValidationError", "Incorrect value was passed" + message ? ": " + message : "");
    }
}

export class BpdUnknownStorageOption extends BpdError {
    constructor(message?: string) {
        super("BpdUnknownStorageOption", message);
    }
}

export class BpdUnknownStorageItemType extends BpdError {
    constructor(message?: string) {
        super("BpdUnknownStorageItemType", message);
    }
}

export class BpdStorageUnavailable extends BpdError {
    constructor(message?: string) {
        super("BpdStorageUnavailable", message);
    }
}