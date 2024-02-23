// Implementing a reverse string using only enqueue, dequeue and isEmpty methods
// TIP: use stacks to solve reverse challenges
import { StackWithDynamicArray } from "../../stacks/classes/stackWithDynamicArray.js";

export class ReverseQueueWithStack {
  // Q [10, 20, 30] --> []
  // S []           --> [30, 20, 10]
  // Thing about passign from queue to stack as from one bag to the other and then in reverse

  static reverse(queueprop) {
    let stack = new StackWithDynamicArray();
    while (!queueprop.isEmpty) {
      stack.add(queueprop.dequeue());
    }

    while (!stack.isEmpty()) {
      queueprop.enqueue(stack.pop());
    }
  }
}
