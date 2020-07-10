
import { BpdStorage } from '../src/index';

describe("Tests checking library", function () {
    let storage: BpdStorage;
    beforeAll(() => {
        storage = new BpdStorage('local');
    })
    afterEach(() => {
        storage.clear();
    })

    it("Tests access to storage", function () {
        expect(storage.isAccessible()).toBeTrue();
    })

    it("Tests checking key existance - non exisiting", function () {
        expect(storage.has("XXX")).toBeFalse();
    })

    it("Tests checking key existance - incorrect key", function () {
        let hasFailed = false;
        storage.throwValidationErrors(true);
        try {
            storage.setItem("", "X")
        }
        catch (e) {
            hasFailed = true
        }
        storage.throwValidationErrors(false);
        expect(hasFailed).toBeTrue();
    })

    it("Tests checking key existance - existing", function () {
        storage.setItem("XXX", "X")
        expect(storage.has("XXX")).toBeTrue();
    })

    it("Tests checking key existance - null key", function () {
        storage.setItem(null, "X")
        expect(storage.has("XXX")).toBeFalse();
    })

    it("Tests checking key existance - empty key", function () {
        storage.setItem("", "X")
        expect(storage.has("")).toBeFalse();
    })

    it("Tests checking key existance - throw validation on empty key", function () {
        let hasFailed = false;
        storage.throwValidationErrors(true);
        try {
            storage.setItem("", "X")
        }
        catch (e) {
            hasFailed = true
        }
        storage.throwValidationErrors(false);
        expect(hasFailed).toBeTrue();
    })

    it("Tests checking [removeItem] - normal case", function () {
        let hasRemoved = false;
        storage.setItem("X", "X")
        let hasAdded = storage.getItem('X') !== null;
        storage.removeItem("X")
        hasRemoved = storage.getItem('X') === null;
        expect(hasAdded).toBeTrue();
        expect(hasRemoved).toBeTrue();
    })

    it("Tests checking [removeItem] - empty key", function () {
        let hasFailed = false;
        try {
            storage.removeItem("")
        } catch (e) {
            hasFailed = true;
        }
        expect(hasFailed).toBeFalse();
    })

    it("Tests checking [setArray/getArray] - normal case", function () {
        let array = ['one', 'two', 'three']
        let out: string[] = null;
        let hasFailed = false;
        try {
            storage.setArray("array", array)
            out = storage.getArray('array')
        } catch (e) {
            hasFailed = true;
        }
        expect(hasFailed).toBeFalse();
        expect(out.length).toEqual(3);
        expect(out[0]).toEqual(array[0]);
        expect(out[1]).toEqual(array[1]);
        expect(out[2]).toEqual(array[2]);
    })

    it("Tests checking [setAny/getAny] - normal case", function () {
        let obj = { a: "1", b: "2" };
        let out: any = null;
        let hasFailed = false;
        try {
            storage.setAny("A", obj)
            out = storage.getAny('A')
        } catch (e) {
            console.error(e)
            hasFailed = true;
        }
        expect(hasFailed).toBeFalse();
        expect(out.a).toEqual(obj.a);
        expect(out.b).toEqual(obj.b);
    })

    it("Tests checking [setBoolean/getBoolean] - True case", function () {
        let obj = "True";
        let out: boolean = null;
        let hasFailed = false;
        try {
            storage.setBoolean("A", obj)
            out = storage.getBoolean('A')
        } catch (e) {
            console.error(e)
            hasFailed = true;
        }
        expect(hasFailed).toBeFalse();
        expect(out).toBeTrue();
    })

    it("Tests checking [setBoolean/getBoolean] - Any case", function () {
        let obj = "XXX";
        let out: boolean = null;
        let hasFailed = false;
        try {
            storage.setBoolean("A", obj)
            out = storage.getBoolean('A')
        } catch (e) {
            console.error(e)
            hasFailed = true;
        }
        expect(hasFailed).toBeFalse();
        expect(out).toBeFalse();
    })

    it("Tests checking [length] - returns proper number of storage", function () {
        let length: number = -1;
        let hasFailed = false;
        try {
            storage.setBoolean("A", "XXX")
            storage.setBoolean("B", "True")
            length = storage.length();
        } catch (e) {
            console.error(e);
            hasFailed = true;
        }
        expect(hasFailed).toBeFalse();
        expect(length).toEqual(2);
    })

    it("Tests checking [clear] - clears storage", function () {
        let hasFailed = false;
        let len1: number = -1;
        let len2: number = -1;
        try {

            storage.setBoolean("A", "XXX")
            storage.setBoolean("B", "True")
            len1 = storage.length();
            storage.clear();
            len2 = storage.length();
        } catch (e) {
            console.error(e);
            hasFailed = true;
        }
        expect(hasFailed).toBeFalse();
        expect(len1).toEqual(2);
        expect(len2).toEqual(0);
    })

})