# bpd-storage
Provides a simple wrap on storage in the browser
To serialize objects it uses JSON.stringify, JSON.parse
To serialize arrays it joins values (with ;) when serializing and splits during deserialization
Provides following methods

// Instead of returning null or false object will throw validation errors when argument are incorrect/empty
```javascript
throwValidationErrors(flag: boolean): void;
```
// Retrives storage item value
```javascript
getItem(key: string): string;
```

// Retrives storage item value as int
```javascript
getNumber(key: string): number;
```

// Retrives storage item value as boolean

NOTE! Keep in mind that this method returns proper result only when value was set by using **setBoolean**
```javascript
getBoolean(key: string): boolean;
```

// Retrives storage item value as any item - shall be used JSON based values
```javascript
getAny(key: string): any;
```
// Retrives storage item value as array item
```javascript
getArray(key: string): string[];
```
// Checks whether key exsits in storage
```javascript
has(key: string): boolean;
```
// Sets item in storage
```javascript
setItem(key: string, value: any): void;
```
// Sets number in storage
```javascript
setNumber(key: string, value: any): void;
```
// Sets boolean in storage - as serialized value
```javascript
setBoolean(key: string, value: any): void;
```
// Sets object in storage
```javascript
setAny(key: string, value: any): void;
```
// Sets array in storage
```javascript
setArray(key: string, value: any): void;
```
// Performs test on storage
```javascript
isAccessible(): boolean;
```
// Retrives number of elements in storage
```javascript
length(): number;
```
// Removes specific item from storage
```javascript
removeItem(key: string): void;
```
// Clears the storage
```javascript
clear(): void
```
// Returns actual storage object
```javascript
get(): Storage;
```