import { StackWithDynamicArray } from "./stackWithDynamicArray.js"; // Node needs the extension to work with ES6 Modules

class BalancedExpressionsWithStack {
  // we better declare const data in the constructor or private initiation so it does not waste space memory within methods
  #openSymbols = ["(", "{", "[", "<"];
  #closeSymbols = [")", "}", "]", ">"];

  isOpenSymbol = (character) => this.#openSymbols.includes(character);
  #isCloseSymbol = (character) => this.#closeSymbols.includes(character);

  #getOpenSymbol = (symbol) => {
    switch (symbol) {
      case ")":
        return "(";
      case "}":
        return "(";
      case "]":
        return "[";
      case ">":
        return "<";
      default:
        return null;
    }
  };

  check = (expression) => {
    let openSymbolsStack = new StackWithDynamicArray();
    for (let i in expression) {
      let character = expression[i];
      if (this.isOpenSymbol(character)) {
        openSymbolsStack.add(character);
      }

      if (this.#isCloseSymbol(character)) {
        // compare with openSymbolsStack last item.
        if (this.#getOpenSymbol(character) == openSymbolsStack.peek()) {
          // if its a match for open and close, remove last open symbol checked
          openSymbolsStack.pop();
        } else {
          // if not a match, return false, not balanced
          return false;
        }
      }
    }
    // it mostly closed, last check see if something was left open
    return openSymbolsStack.isEmpty();
  };
}
