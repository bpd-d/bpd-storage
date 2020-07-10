export declare type BpdStorageItemType = 'string' | 'boolean' | 'number' | 'object' | 'array';
export declare type BpdStorageType = 'local' | 'session';
export interface IBpdStorage {
    getItem(key: string): string;
    getNumber(key: string): number;
    getBoolean(key: string): boolean;
    getAny(key: string): any;
    getArray(key: string): string[];
    has(key: string): boolean;
    setItem(key: string, value: any): void;
    setNumber(key: string, value: any): void;
    setBoolean(key: string, value: any): void;
    setAny(key: string, value: any): void;
    setArray(key: string, value: any): void;
    isAccessible(): boolean;
    length(): number;
    removeItem(key: string): void;
    clear(): void;
    get(): Storage;
    throwValidationErrors(flag: boolean): void;
}
export declare class BpdStorage implements IBpdStorage {
    #private;
    constructor(type: BpdStorageType);
    throwValidationErrors(flag: boolean): void;
    get(): Storage;
    removeItem(key: string): void;
    clear(): void;
    isAccessible(): boolean;
    length(): number;
    getItem(key: string): string;
    getNumber(key: string): number;
    getBoolean(key: string): boolean;
    getAny(key: string): any;
    getArray(key: string): string[];
    has(key: string): boolean;
    setItem(key: string, value: any): void;
    setNumber(key: string, value: any): void;
    setBoolean(key: string, value: any): void;
    setAny(key: string, value: any): void;
    setArray(key: string, value: any): void;
}
declare class BpdError extends Error {
    constructor(name: string, message?: string);
}
export declare class BpdValidationError extends BpdError {
    constructor(message?: string);
}
export declare class BpdUnknownStorageOption extends BpdError {
    constructor(message?: string);
}
export declare class BpdUnknownStorageItemType extends BpdError {
    constructor(message?: string);
}
export declare class BpdStorageUnavailable extends BpdError {
    constructor(message?: string);
}
export {};
