// import { ObjectQueue } from "./classes/objectQueue.js";
// import { ReverseQueueWithStack } from "./classes/reverseQueueWithStack.js";
import { ObjectQueue, ReverseQueueWithStack } from "./classes/index.js";

// describe("reverseQueueWithStack", () => {
//   test("using ObjectQueue type", () => {
const queue = new ObjectQueue();
queue.enqueue(10);
queue.enqueue(20);
queue.enqueue(30);
console.log("queue.items", queue.items);

ReverseQueueWithStack.reverse(queue);
console.log("after reverse queue.items", queue.items);
//   });
// });
