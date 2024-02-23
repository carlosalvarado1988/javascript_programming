export class StackWithSize {
  #size;
  #items;
  #head = 0;

  constructor(length) {
    this.#size = length;
    this.#items = new Array(length);
  }

  // add element to the stack
  add(element) {
    if (this.isFull) {
      console.error("Stack is full");
      return;
    }
    this.#items[this.#head++] = element;
  }

  // remove element from the stack
  pop() {
    if (this.isEmpty) {
      console.error("Stack is empty");
      return;
    }
    const item = this.#items[this.#head - 1];
    this.#items[this.#head - 1] = null;
    this.#head--;
    return item;
  }

  // view the last element
  peek() {
    return this.#items[this.#head - 1];
  }

  // check if the stack is empty
  get isEmpty() {
    return this.#head == 0;
  }

  // the size of the stack
  get size() {
    return this.#size;
  }

  get isFull() {
    return this.#head == this.#size;
  }

  get items() {
    return this.#items;
  }

  // empty the stack
  clear() {
    this.#items = new Array(this.#size);
  }
}
