/*
Priorty Queue is an structure used by the operating system to organize tasks.
whenever a new item is inserted, elements are shifted and organized in priorty order (desc order by default, greater value first)
when removing items, it only updates the inner size property to point the last element.

Priority Queue ----> with Heap
insert: O(n)  ----> O(log n)  
delete: O(1)  ----> O(log n)
If you use a heap, you get faster inserts, slower deletes with heap.

you can decide which to use.


*/

// This implementation is a wrapper to the heap class.
// its a good interface to work with.
import { Heap } from "../../../non-linear/heaps/classes/heap.js";

export class PriorityQueueWithHeap {
  #heap = new Heap();

  constructor(length) {
    this.#heap = new Heap(length);
  }
  enqueue(item) {
    return this.#heap.insert(item);
  }
  dequeue() {
    return this.#heap.remove();
  }

  isEmpty() {
    this.#heap.isEmpty();
  }
}
