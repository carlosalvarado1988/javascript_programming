// Implementing a string reverse using the stack
import { StackWithDynamicArray } from "./stackWithDynamicArray.js";

export class StringReverserWithStack {
  static reverse(input) {
    if (!input) {
      console.error("input is empty");
      return;
    }
    let stack = new StackWithDynamicArray();

    for (let index in input) {
      stack.add(input[index]);
    }
    let reversed = "";
    while (!stack.isEmpty()) {
      reversed += stack.pop();
    }
    return reversed;
  }
}
