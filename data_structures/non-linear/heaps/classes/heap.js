/* 
Heaps are BT (binary trees) that feed level to level 
    - entries are from left to right
    - heap property: every value in the upper level is greater than children levels.
    - max heap: the root node with the greates value
    - min heap: the leaf node with the smallest value
    - a complete heap is what satisfies all the above properties

Applications in real world:
    - sorting data, (HeapSort)
    - Graph algorithms (shortest path) - used in maps
    - Priority Queues
    - Finding the Kth smallest or largest value

Operations and runtime complexity
    - bubleup operation: for every insert, move to position level to be greater if needed.
    - the longest it can traverse in bubble up is the height of the tree.
    - runtime is O(log n) => O(h), because each iteration is removing half of the posibilites as its binary (binary tree)

- Delete nodes: 
    you can only remove the root node, not the inner nodes.
    for every delete, some bubble up and down need to be performed to arrange the heap again.
    the inner nodes to move are the last leaf node from left to right (taking the right one)
    deleting also runs in O(log n).
*/

/*
Exercise:
    Insert the following numbers in a heap. 
    raw the heap at each step. 
    Compare your solution with mine in the following pages.  
    (15, 10, 3, 8, 12, 9, 4, 1, 24)  
    Once you’re done, remove the root (24) from the heap. 



/*

IMPLEMENTING A HEAP
- Its easier to implement it using an array.
- it has a smaller footprint in memory.
- we dont need left and right references to be stored.
- references can be calculated with these formulas.
    - left = parent * 2 + 1.
    - right = parent * 2 + 2.
    - parent = (index -1) / 2.

Consider bubble up and down for each operation insert and remove
javascript: consider a specific lenght to play with specific index position later on.
*/

export class Heap {
  #items = [];
  #size = 0; // keep track of size, on remove, will decrease size, not physically remove it from array
  constructor(length) {
    if (length) this.#items = new Array(length);
  }

  get size() {
    return this.#size;
  }

  #swap(firstIdx, secondIdx) {
    console.log("into swap");
    const temp = this.#items[firstIdx];
    this.#items[firstIdx] = this.#items[secondIdx];
    this.#items[secondIdx] = temp;
    console.log("items swapped");
  }

  #getParentIndex(index) {
    return Math.floor((index - 1) / 2); // to return an absolute integer
  }

  #bubbleUp() {
    console.log("into bubbleUp");
    let newItemIndex = this.#size - 1; // because it was incremented just prior this func is triggered

    while (
      newItemIndex > 0 &&
      this.#items[newItemIndex] >
        this.#items[this.#getParentIndex(newItemIndex)]
    ) {
      this.#swap(newItemIndex, this.#getParentIndex(newItemIndex));
      // now recalculate newItemIndex as the current parent.
      newItemIndex = this.#getParentIndex(newItemIndex);
    }
  }

  #getLeftChildrenIndex(index) {
    return index * 2 + 1;
  }

  #getRightChildrenIndex(index) {
    return index * 2 + 2;
  }

  #leftChild(index) {
    return this.#items[this.#getLeftChildrenIndex(index)];
  }

  #rightChild(index) {
    return this.#items[this.#getRightChildrenIndex(index)];
  }

  #hasLeftChild(index) {
    return this.#getLeftChildrenIndex(index) <= this.#size;
  }

  #hasRightChild(index) {
    return this.#getRightChildrenIndex(index) <= this.#size;
  }

  #bubbleDown() {
    // because we need index to be Dynamic, let this be a function that
    // is triggered within the while condition, passing down its index
    const isValidParent = (idx) => {
      // expanded scenarios when no left or right
      // no left child, mean level leaf is empty, parent is valid
      if (!this.#hasLeftChild(idx)) return true;

      // no right child, only compare left value
      if (!this.#hasRightChild(idx))
        return this.#items[idx] >= this.#leftChild(idx);

      // compare values of both sides
      return (
        this.#items[idx] >= this.#leftChild(idx) &&
        this.#items[idx] >= this.#rightChild(idx)
      );
    };

    const getLargetChildIndex = (idx) => {
      // no left child, return same idx, this level is empty
      if (!this.#hasLeftChild(idx)) return idx;

      // no right child, means left is the only, return it.
      if (!this.#hasRightChild(idx)) return this.#leftChild(idx);

      // perform a comparison to determine left vs right
      return this.#leftChild(idx) > this.#rightChild(idx)
        ? this.#getLeftChildrenIndex(idx)
        : this.#getRightChildrenIndex(idx);
    };

    // item (root) < letfChildren &&
    // item(root) < rightChildren;
    let index = 0;
    while (index <= this.#size && !isValidParent(index)) {
      //if not validParent, then swap them
      const largerChildIndex = getLargetChildIndex(index);
      this.#swap(index, largerChildIndex);
      index = largerChildIndex; // set new index with new larger to continuosly bubble down this children
    }
  }

  isFull() {
    return this.#size == this.#items.length;
  }

  isEmpty() {
    return this.#size == 0;
  }

  insert(newItem) {
    if (this.isFull()) {
      console.error("Heap is full, no insert allowed");
      return;
    }
    this.#items[this.#size++] = newItem; // insert element and increment for new size

    this.#bubbleUp(); // check for buble operation
  }

  remove() {
    console.log("\ninto remove");
    if (this.isEmpty()) {
      console.error("Heap is empty, remove not allowed");
      return;
    }
    // always remove the root node that holds the largest value
    // assing the last item to the root
    // decrement #size by one (not remove value from array in this implementation)
    const root = this.#items[0];
    this.#items[0] = this.#items[--this.#size];
    this.#bubbleDown();
    return root;
  }
}
