import { PriorityQueue } from "./classes/priorityQueue.js";

const priorityQueue = new PriorityQueue();

console.log("priorityQueue.items", priorityQueue.items);
priorityQueue.enqueue(10);
console.log("priorityQueue.items", priorityQueue.items);
priorityQueue.enqueue(30);
console.log("priorityQueue.items", priorityQueue.items);
priorityQueue.enqueue(20);
console.log("priorityQueue.items", priorityQueue.items);
priorityQueue.enqueue(25);
console.log("priorityQueue.items", priorityQueue.items);
console.log("priorityQueue.dequeue()", priorityQueue.dequeue());
console.log("priorityQueue.items", priorityQueue.items);
console.log("priorityQueue.dequeue()", priorityQueue.dequeue());
console.log("priorityQueue.dequeue()", priorityQueue.dequeue());
console.log("priorityQueue.dequeue()", priorityQueue.dequeue());
console.log("priorityQueue.items", priorityQueue.items);
priorityQueue.enqueue(10);
console.log("priorityQueue.items", priorityQueue.items);
priorityQueue.enqueue(8);
console.log("priorityQueue.items", priorityQueue.items);
