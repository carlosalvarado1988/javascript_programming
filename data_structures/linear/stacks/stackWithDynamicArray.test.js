import { StackWithDynamicArray } from "./classes/stackWithDynamicArray.js";

let stack = new StackWithDynamicArray();
console.log(stack.peek()); // return undefined as no data yet
stack.add(1);
stack.add(2);
stack.add(4);
stack.add(8);
console.log(stack.items);

stack.pop();
console.log(stack.items);
console.log(stack.peek());
console.log(stack.isEmpty());
console.log(stack.size());
stack.clear();
console.log(stack.items);
