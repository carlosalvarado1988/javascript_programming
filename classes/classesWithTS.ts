function CircleClass(radius: number) {
  // "noImplicitThis": false to avoid error using this
  let color: string = "red";
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
const _radius = new WeakMap();
const _move = new WeakMap();

class Circle {
  constructor(radius: number) {
    _radius.set(this, radius);
    _move.set(this, () => {
      // logic that can use radius too, inherits the context fo the Circle object
      console.log("move", this);
    });
  }

  draw() {
    _move.get(this)(); // calling the private function
    console.log("draw");
  }
}

// ################################

// the same but using only one instance of WeakMap
const privateProps = new WeakMap();
class Circle2 {
  constructor(radius: number) {
    privateProps.set(this, {
      radius: radius,
      move: () => {
        console.log("move", this);
      },
    });
  }

  draw() {
    privateProps.get(this).move();
    console.log("draw");
  }
}

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
class Something {
  #property;

  constructor() {
    this.#property = "test";
  }

  #privateMethod() {
    return "hello world";
  }

  getPrivateMessage() {
    return this.#property;
  }
}

const instance = new Something();
// console.log(instance.property); //=> undefined
// console.log(instance.privateMethod); //=> undefined
console.log(instance.getPrivateMessage()); //=> test
// console.log(instance.#property); //=> Syntax error

// ################################ Using typescript

class Account {
  readonly id: number;
  name: string;
  private balance: number;
  optional?: string;

  constructor(id: number, name: string, balance: number) {
    this.id = id;
    this.name = name;
    this.balance = balance;
  }

  public deposit(amount: number): void {
    if (amount <= 0) {
      throw new Error("invalid amount");
    }
    this.balance += amount;
  }
  private calculateTax() {
    return this.balance * 0.13;
  }
}

// the compiled result
// var Account = /** @class */ (function () {
//   function Account(id, name, balance) {
//       this.id = id;
//       this.name = name;
//       this.balance = balance;
//   }
//   Account.prototype.deposit = function (amount) {
//       if (amount <= 0) {
//           throw new Error("invalid amount");
//       }
//   };
//   return Account;
// }());

// ################################ Vanilla Javascript typescript

class AccountSintaxReduced {
  nickname?: string; // optional

  constructor(
    public readonly id: number,
    public name: string,
    private _balance: number
  ) {}

  public deposit(amount: number): void {
    if (amount <= 0) {
      throw new Error("invalid amount");
    }
    this._balance += amount;
  }
  private calculateTax() {
    return this._balance * 0.13;
  }
  get balance(): number {
    return this._balance;
  }

  set balance(value: number) {
    this._balance = value;
  }
}
