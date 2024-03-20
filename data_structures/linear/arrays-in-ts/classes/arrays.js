"use strict";
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
// ############### Playing with array remove element
// let numbers: number[] = [10, 20, 30];
// const indexToRemove = numbers.indexOf(20);
// numbers.push(40, 50);
// const part1 = numbers.slice(0, indexToRemove);
// const part2 = numbers.slice(indexToRemove + 1);
// const newArray = part1.concat(part2);
// // The splice() method of Array instances changes the contents of an array by removing or replacing existing elements and/or adding new elements in place.
// // MUTATING METHOD, modifying numbers reference,
// const newArray2 = numbers.splice(indexToRemove, 1);
// console.log("🚀 ~ file: index.ts:17 ~ newArray2:", newArray2);
// console.log("🚀 ~ file: index.ts:17 ~ numbers:", numbers);
// // how to do it with toSpliced(): create a new array with a segment removed and/or replaced without mutating the original array
// ############### Playing with array custom class
// for now declaring private methods
// outside the scope of the class but within its closure
// let _length: number;
// let _items: number[];
// Array with limit Length
var ArrayWithLimitedLength = /** @class */ (function () {
    function ArrayWithLimitedLength(length) {
        this.length = length;
        this._elementsCount = 0;
        this.items = new Array(length);
    }
    ArrayWithLimitedLength.prototype.print = function () {
        // we use the this._elementsCount as a reference to the limit to print
        for (var i = 0; i < this._elementsCount; i++) {
            console.log(this.items[i]);
            // another way
            // this.items.forEach((i) => {
            //   console.log(i);
            // });
        }
    };
    Object.defineProperty(ArrayWithLimitedLength.prototype, "isFull", {
        get: function () {
            return this._elementsCount === this.items.length;
        },
        enumerable: false,
        configurable: true
    });
    ArrayWithLimitedLength.prototype.insert = function (item) {
        if (this.isFull) {
            console.error("array is full");
        }
        this.items[this._elementsCount++] = item;
    };
    ArrayWithLimitedLength.prototype.removeAt = function (index) {
        // validate index, no -1
        if (index < 0 || index > this._elementsCount) {
            console.error("Invalid index to remove");
        }
        // shift the items to the left to fill the hole
        for (var i = index; i < this._elementsCount; i++) {
            // starting in the remove index, we assign the next value to replace the current i.
            this.items[i] = this.items[i + 1];
        }
        // this leaves with an extra number in the this.items array.
        // we cut this._elementsCount reference
        this._elementsCount--;
        // to keep array consistent. do a pop to clean
        return this.items.pop();
    };
    ArrayWithLimitedLength.prototype.indexOf = function (item) {
        // if found return the index
        for (var i = 0; i < this._elementsCount; i++) {
            if (this.items[i] === item) {
                return i;
            }
        }
        // if not found, return -1
        return -1;
    };
    //Extend the Array class and add a method to reverse the array. For example, if the array includes [1, 2, 3, 4], after reversing and printing it, we should see [4, 3, 2, 1].
    ArrayWithLimitedLength.prototype.reverse = function () {
        var newA = [];
        for (var i = this._elementsCount - 1; i >= 0; i--) {
            newA.push(this.items[i]);
        }
        return newA;
    };
    // Extend the Array class and add a new method to insert an item at a given index
    ArrayWithLimitedLength.prototype.insertAt = function (item, index) {
        // validate index is within items array
        if (index < 0 || index > this._elementsCount) {
            console.error("Invalid index to insert");
        }
        if (this.isFull) {
            console.error("array is full");
        }
        // move elements to the right,
        // from right to left, move the elements one position until move the element in the index.
        // until now, we have duplicated value in index and next to the index.
        for (var i = this._elementsCount - 1; i >= index; i--) {
            this.items[i + 1] = this.items[i];
        }
        // add element at given index / replace the duplicated,
        this.items[index] = item;
        this._elementsCount++;
    };
    ArrayWithLimitedLength.prototype.insertAtWithES6 = function (item, index) {
        // preparing the new count for print
        this._elementsCount++;
        // using spread
        this.items = __spreadArray(__spreadArray(__spreadArray([], this.items.slice(0, index), true), [
            item
        ], false), this.items.slice(index), true);
    };
    ArrayWithLimitedLength.prototype.insertAtWithES6Splice = function (item, index) {
        // The splice() method is used to change an array by adding, removing, or replacing elements. This method modifies the original array.
        this.items.splice(index, 0, item);
        this._elementsCount++;
    };
    ArrayWithLimitedLength.prototype.iterator = function () {
        var i;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    i = 0;
                    _a.label = 1;
                case 1:
                    if (!(i < this.items.length)) return [3 /*break*/, 4];
                    return [4 /*yield*/, this.items[i]];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3:
                    i++;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/];
            }
        });
    };
    return ArrayWithLimitedLength;
}());
exports.default = ArrayWithLimitedLength;
// exporting this file creates problems with the typescript compiler
// Object.defineProperty(exports, "__esModule", { value: true });
// ReferenceError: exports is not defined in ES module scope
var array = new ArrayWithLimitedLength(3);
array.insert(10);
array.insert(20);
array.insert(30);
array.insert(40);
array.insert(50);
console.log("index of 20", array.indexOf(20));
console.log("index of 50", array.indexOf(50));
array.removeAt(3);
console.log("item at index 3 was removed");
console.log("index of 50", array.indexOf(50));
console.log("index of 150", array.indexOf(150));
console.log("print the array");
array.print();
var reversedArray = array.reverse();
console.log("reversedArray:", reversedArray);
// insertAt
console.log("insertAt the array");
array.print();
console.log("insertAt(60, 2)");
array.insertAt(60, 2);
array.print();
// insertAt
console.log("insertAtWithES6 the array");
array.print();
console.log("insertAtWithES6(60, 2)");
array.insertAtWithES6(55, 2);
array.print();
// replaceAtWithES6
console.log("insertAtWithES6Splice the array");
array.print();
console.log("insertAtWithES6Splice(70, 4)");
array.insertAtWithES6Splice(70, 4);
array.print();
// check on iterator
var iterator = array.iterator();
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
