// USING DYNAMIC ARRAY

// this type of queue sorts the content in ASC order.
// whatever value we insert, the pop() method will bring data in ASC order.
// here we implement that logic using JavaScript and dynamic array.

// logic.
// items = [1, 3, 5, 7]
// insert 2.
// 1 - iterate from right to left, compare if element < current
// move current to next postion (index + 1).
// items = [1, 3, 5, 7, 7]
//                *    (moved)
// 2 - iterate next from rigth to left, compare if element < current
// move current to next postion (index + 1).
// items = [1, 3, 5,   5,     7]
//             *    (moved)
// 3 - iterate next from rigth to left, compare if element < current
// move current to next postion (index + 1).
// items = [1, 3,   3,   5, 7]
//          *    (moved)
// 4 - iterate next from rigth to left, compare if element < current
// element is graetmove current insert in next postion (index + 1).
// items = [1,   2,   3, 5, 7]
//            (insert)

export class PriorityQueue {
  constructor() {
    this.elements = [];
  }

  get items() {
    return this.elements;
  }
  get isEmpty() {
    return this.elements.length == 0;
  }

  //private method
  #compareAndshiftElementsToInsertByIndex(item) {
    let i;
    for (i = this.elements.length - 1; i >= 0; i--) {
      if (this.elements[i] > item) {
        this.elements[i + 1] = this.elements[i]; // move one element to the right
      } else {
        break;
      }
    }
    return i + 1;
  }

  enqueue(element) {
    // check if empty
    if (this.isEmpty) {
      this.elements.push(element);
      return;
    }
    const index = this.#compareAndshiftElementsToInsertByIndex(element);
    this.elements[index] = element;
  }

  dequeue() {
    return this.elements.pop(); // to return the greater value first
    // return this.elements.splice(0, 1)[0]; // to return the smaller
  }
}
