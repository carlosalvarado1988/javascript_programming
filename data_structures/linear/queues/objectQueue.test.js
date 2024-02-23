import { ObjectQueue } from "./classes/index.js";

const queue = new ObjectQueue();
queue.enqueue(10);
queue.enqueue(20);
queue.enqueue(30);
console.log("queue.items", queue.items);
const item = queue.dequeue();
console.log("dequeue item:", item);
console.log("queue.items", queue.items);
