// What are advantages to adding methods to a class vs adding methods to a class's prototype?

/*
In your first snippet, two functions are created for every construction of myClass. In the second snippet, the two functions are created once: when the prototype is filled. If many instances are created, the second snippet might require less memory.

The scopes are also different. In your first snippet, your method1 could access the prop1 variable:

this.method1 = function() { 
    console.log(prop1); 
}; 

In the second one, your method1 can only access the property prop1:

myClass.prototype.method1 = function() { 
    console.log(this.prop1); 
}; 
*/

var AppleTree = function (appleCount) {
  this.appleCount = appleCount;
  this.getAppleCountArgument = function () {
    return appleCount;
  };
};
AppleTree.prototype.getAppleCountProperty = function () {
  return this.appleCount;
};
function eatApple(tree) {
  tree.appleCount--;
}
// Create a tree with five apples.
var tree = new AppleTree(5);
// Check the apple count through both functions.
console.log("Argument: " + tree.getAppleCountArgument());
console.log("Property: " + tree.getAppleCountProperty());
// Reduce the number of apples in the tree.
eatApple(tree);
// Check the apple count once more through both functions.
console.log("Argument: " + tree.getAppleCountArgument());
console.log("Property: " + tree.getAppleCountProperty());

class AccountVanillaJavascript {
  id;
  name;
  balance;
  constructor(id, name, balance) {
    this.id = id;
    this.name = name;
    this.balance = balance;
  }
  deposit(amount) {
    if (amount <= 0) {
      throw new Error("invalid amount");
    }
    this.balance += amount;
  }
}
