// Test zone
import { ArrayQueue } from "./classes/index.js";

const aqueue = new ArrayQueue(4); // [ empty, empty, empty, empty ]
aqueue.enqueue(10); // [ 10, empty, empty, empty ]
aqueue.enqueue(20); // [ 10, 20, empty, empty ]
aqueue.enqueue(30); // [ 10, 20, 30, empty ]
aqueue.enqueue(40); // [ 10, 20, 30, 40 ]
console.log("aqueue.peek()", aqueue.peek()); // 40
console.log("aqueue.isFull", aqueue.isFull); // true
aqueue.enqueue(40); // throw the error, queue is full
console.log("aqueue.dequeue()", aqueue.dequeue()); // [ null, 20, 30, 40 ]

// ENTERING THE CIRCULAR ARRAY SOLUTION
aqueue.enqueue(50);
// [ null, 20, 30, 40, 50 ] (this was corrected with the circular array)
// In Javascript arrays are dynamic,
// it automatically adds 1 element to the right in the array.
// in other languages like JAVA, C#, C++,
// the lenght of the array is static to reference the memory.
// to solve the problem, they need a circular array

// this.#items [ null, 20, 30, 40 ]
// this.#items [ null, 20, 30, 40, 50 ] -> this goes out of boundary with javascript

// Solution
// 1. create a new array with double space and copy elements to continue adding - less efficient.
// 2. use circular arrays to use the empty spaces
// take a look to  #circularArrayTargetIndex(index, lenght) {
console.log("aqueue.peek()", aqueue.peek()); // 50 ->  // [ 50, 20, 30, 40 ]

// IMPORTANT - this queue knows whats the begging and the end because of the
// this.#front and this.#rear pointers, not the index position
aqueue.enqueue(60); // throw the error, queue is full
console.log("aqueue.dequeue()", aqueue.dequeue()); // [ 50, null, 30, 40 ]
console.log("aqueue.dequeue()", aqueue.dequeue()); // [ 50, null, null, 40 ]
aqueue.enqueue(60); // [ 50, 60, null, 40 ]
aqueue.enqueue(70); // [ 50, 60, 70, 40 ]
console.log("aqueue.peek()", aqueue.peek()); // 70

// in the end the circular array:
// [ 50,  60,  70,   40 ]
//            rear  front
