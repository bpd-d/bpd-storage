export declare type BpdStorageItemType = 'string' | 'boolean' | 'number' | 'object' | 'array';
export declare type BpdStorageType = 'local' | 'session';
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
    clear(): void;
    get(): Storage | undefined;
    throwValidationErrors(flag: boolean): void;
}
export declare class BpdStorage implements IBpdStorage {
    private _handler;
    private _name;
    constructor(type: BpdStorageType, name?: string);
    throwValidationErrors(flag: boolean): void;
    get(): Storage | undefined;
    removeItem(key: string): void;
    clear(): void;
    isAccessible(): boolean;
    length(): number;
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
    private getKey;
    private isString;
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
