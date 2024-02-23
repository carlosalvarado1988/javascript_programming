var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Something_instances, _Something_property, _Something_privateMethod;
function CircleClass(radius) {
    // "noImplicitThis": false to avoid error using this
    var color = "red";
    this.radius = radius;
    this.defaultLocation = { x: 0, y: 1 };
    this.getColor = function () {
        // color is private
        console.log(color);
        return color;
    };
    // to access classInstance.color
    Object.defineProperty(this, "color", {
        get: function () {
            return color;
        },
        set: function (value) {
            color = value;
        },
    });
}
// #### USING WeakMap() to declare private members
// an example using independent declarations for private
var _radius = new WeakMap();
var _move = new WeakMap();
var Circle = /** @class */ (function () {
    function Circle(radius) {
        var _this = this;
        _radius.set(this, radius);
        _move.set(this, function () {
            // logic that can use radius too, inherits the context fo the Circle object
            console.log("move", _this);
        });
    }
    Circle.prototype.draw = function () {
        _move.get(this)(); // calling the private function
        console.log("draw");
    };
    return Circle;
}());
// ################################
// the same but using only one instance of WeakMap
var privateProps = new WeakMap();
var Circle2 = /** @class */ (function () {
    function Circle2(radius) {
        var _this = this;
        privateProps.set(this, {
            radius: radius,
            move: function () {
                console.log("move", _this);
            },
        });
    }
    Circle2.prototype.draw = function () {
        privateProps.get(this).move();
        console.log("draw");
    };
    return Circle2;
}());
// ################################
/// #### USING SYMBOLS: a way to hide the real name of a propery
// const privateMethod = Symbol();
// const _lengthPrivateSymbol = Symbol();
// class CustomArray {
//   constructor(length: number) {
//     this[_lengthPrivateSymbol] = length;
//   }
//   //this method is private because of symbol
//   [privateMethod]() {
//     return this[_lengthPrivateSymbol];
//   }
//   get length() {
//     return this[_lengthPrivateSymbol];
//   }
//   set length(value: number) {
//     if (value <= 0) throw new Error("invalid length");
//     this._lengthPrivateSymbol = value;
//   }
// }
// ################################
// const a = new CustomArray(2);
// console.log(a.length);
// a.length = 10;
// console.log(a.length);
// for ECMAS2015 or Higher - it needs Babel configured
var Something = /** @class */ (function () {
    function Something() {
        _Something_instances.add(this);
        _Something_property.set(this, void 0);
        __classPrivateFieldSet(this, _Something_property, "test", "f");
    }
    Something.prototype.getPrivateMessage = function () {
        return __classPrivateFieldGet(this, _Something_property, "f");
    };
    return Something;
}());
_Something_property = new WeakMap(), _Something_instances = new WeakSet(), _Something_privateMethod = function _Something_privateMethod() {
    return "hello world";
};
var instance = new Something();
// console.log(instance.property); //=> undefined
// console.log(instance.privateMethod); //=> undefined
console.log(instance.getPrivateMessage()); //=> test
// console.log(instance.#property); //=> Syntax error
// ################################ Using typescript
var Account = /** @class */ (function () {
    function Account(id, name, balance) {
        this.id = id;
        this.name = name;
        this.balance = balance;
    }
    Account.prototype.deposit = function (amount) {
        if (amount <= 0) {
            throw new Error("invalid amount");
        }
    };
    return Account;
}());
// ################################ Vanilla Javascript typescript
