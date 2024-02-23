import { ArrayWithLimitedLength } from "./classes/arrays.js";

const array = new ArrayWithLimitedLength(3);

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
const reversedArray = array.reverse();
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
