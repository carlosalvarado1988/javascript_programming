import { PriorityQueue } from "./classes/priorityQueue.js";
import { PriorityQueueWithHeap } from "./classes/priorityQueueWithHeap.js";

const queue = new PriorityQueue(); // using dynamic array
[30, 20, 10].forEach((i) => queue.enqueue(i));
console.log("queue.items", queue.items); // [10, 20, 30]
console.log("queue.dequeue", queue.dequeue());
console.log("queue.dequeue", queue.dequeue());
console.log("queue.dequeue", queue.dequeue());

console.log("\nPriorityQueue with Heap");
const queueWithHeap = new PriorityQueueWithHeap(3);
[30, 20, 10].forEach((i) => queueWithHeap.enqueue(i));
console.log("queueWithHeap.dequeue", queueWithHeap.dequeue()); // [10, 20, 30]
console.log("queueWithHeap.dequeue", queueWithHeap.dequeue());
console.log("queueWithHeap.dequeue", queueWithHeap.dequeue());
