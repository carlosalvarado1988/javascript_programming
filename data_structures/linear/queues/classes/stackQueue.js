// Remember a Queue is FIFO: add elements to the end, extract elements from the begining.
// Stacks is FILO: add element to the begining, extract elements from the begining.

// stack has the oposite behaviour, but with 2 stacks we can reorder
// implement enqueue, dequeue, peek, isFull opeartions
import { StackWithSize } from "../../stacks/classes/stackWithSize.js";

export class StackQueue {
  #baseStack;
  #reversedStackToPop;
  // #head = 0; these pointers are not needed as the stack let us know its state.
  // #tail = 0;
  constructor(length) {
    this.#baseStack = new StackWithSize(length);
    this.#reversedStackToPop = new StackWithSize(length);
  }

  get isFull() {
    return this.#baseStack.isFull;
  }

  get isEmpty() {
    return this.#baseStack.isEmpty;
  }

  get items() {
    return this.#baseStack.items;
  }

  // stacks are reversed by reference
  #reverseStack(baseStack, stackTarget) {
    stackTarget.clear();
    while (!baseStack.isEmpty) {
      // each pop is reducing its length in stack1
      stackTarget.add(baseStack.pop());
    }
  }

  enqueue(element) {
    if (this.isFull) {
      console.error("QueueStack is full its capacity");
      return;
    }
    this.#baseStack.add(element);
  }

  dequeue() {
    // reverse this.#baseStack
    if (this.isEmpty) {
      console.error("StackQueue is empty");
      return;
    }
    this.#reverseStack(this.#baseStack, this.#reversedStackToPop);
    const item = this.#reversedStackToPop.pop();
    this.#reverseStack(this.#reversedStackToPop, this.#baseStack);
    return item;
  }

  peek() {
    return this.#baseStack.peek();
  }
}

// classes/stackWithSize.js
// classes/stackQueue.js
