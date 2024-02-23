// Implementing a string reverse using the stack
import { StackWithDynamicArray } from "./stackWithDynamicArray.js";

export class StackReverser {
  static reverse(input) {
    if (!input) {
      console.error("input is empty");
      return;
    }
    let stack = new StackWithDynamicArray();
    let stackReversed = new Stack();
    for (let index in input) {
      stack.add(input[index]);
    }
    console.log("input.length", input.length);
    // let reversed = new Array(input.length);
    // let counter = 0;
    while (!stack.isEmpty()) {
      // reversed += stack.pop();
      // reversed[counter++] = stack.pop();
      stackReversed.add(stack.pop());
    }
    return stackReversed;
  }
}
