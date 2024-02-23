// https://www.sahinarslan.tech/posts/deep-dive-into-data-structures-using-javascript-priority-queue

export class PriorityQueueWithComparator {
  // The constructor method is called when a new instance of Priority Queue is created.
  constructor(comparator) {
    // Initialize the heap array.
    this.heap = [];

    // Set the comparator method for comparing nodes in the heap.
    // If no comparator function is provided, it defaults to a comparison
    // function that sorts in ascending order (a min-heap).
    this.comparator = comparator || ((a, b) => a - b);
  }

  printItems() {
    console.log("queue.printItems", this.heap);
  }
  // Return the number of items in the heap.
  size() {
    return this.heap.length;
  }

  // Check if the heap is empty.
  isEmpty() {
    return this.size() === 0;
  }

  // Get the top element in the heap without removing it.
  // For a min-heap, this will be the smallest element;
  // for a max-heap, it will be the largest.
  peek() {
    return this.heap[0] ? this.heap[0].value : null;
  }

  // Add a new value to the heap.
  enqueue(value, priority) {
    // First, add the new value to the end of the array.
    this.heap.push({ value, priority });
    // Then, move the new value up the heap to its correct position.
    this._heapifyUp();
  }

  // Remove and return the top element in the heap.
  dequeue() {
    // If the heap is empty, just return null
    if (this.isEmpty()) {
      return null;
    }
    // Save the top element so we can return it later
    const poppedValue = this.peek();

    // If there is more than one node in the heap, move the last node to the top.
    const bottom = this.size() - 1;
    if (bottom > 0) {
      this._swap(0, bottom);
    }

    // Remove the last node (which is now the top node) from the heap.
    this.heap.pop();

    // Move the new top node down the heap to its correct position.
    this._heapifyDown();

    // Finally, return the original top element.
    return poppedValue;
  }

  // This method updates the priority of a specific value in the heap.
  updatePriority(value, newPriority, equalityFn) {
    // Find the index of the item in the heap that matches the given value.
    const index = this.heap.findIndex((item) => equalityFn(item.value, value));

    // If the item is not found, exit the function.
    if (index === -1) {
      return; // Item not found
    }

    // Update the priority of the found item to the new priority.
    const oldPriority = this.heap[index].priority;
    this.heap[index].priority = newPriority;

    // Re-heapify based on whether the new priority is higher or lower than the old priority.
    if (
      this.comparator({ priority: newPriority }, { priority: oldPriority }) < 0
    ) {
      // If the new priority is higher, heapify up from the current index.
      this._heapifyUpFromIndex(index);
    } else {
      // If the new priority is lower, heapify down from the current index.
      this._heapifyDownFromIndex(index);
    }
  }

  search(value, equalityFn) {
    // Find the item in the heap using the provided equality function
    const item = this.heap.find((item) => equalityFn(item.value, value));
    return item ? item : null;
  }

  toSortedArray() {
    const sortedList = [...this.heap];
    return sortedList.sort((a, b) => this.comparator(a.priority, b.priority));
  }

  // ********************* Helper methods below: *********************

  // Method to get the index of a node's parent.
  _parentIndex(index) {
    /*
    About Math.floor:
    
    We take the floor value of the division to 
    make sure we get the nearest lower integer value. 
    This is important because array indexes
    are integer values and cannot have fractional parts.
    */
    return Math.floor((index - 1) / 2);
  }

  // Method to get the index of a node's left child.
  _leftChildIndex(index) {
    return 2 * index + 1;
  }

  // Method to get the value of a node's right child.
  _rightChildIndex(index) {
    return 2 * index + 2;
  }

  // Method to check if a node has left child.
  // It returns true if the left child index is within the valid range of heap indexes,
  // which indicates that a left child exists.
  _hasLeftChild(index) {
    return this._leftChildIndex(index) < this.size();
  }

  // Method to check if a node has right child.
  // It returns true if the right child index is within the valid range of heap indexes,
  // which indicates that a right child exists.
  _hasRightChild(index) {
    return this._rightChildIndex(index) < this.size();
  }

  // Method to swap the values of two nodes in the heap.
  _swap(i, j) {
    // Swap the values of elements at indices i and j without using a temporary variable:
    [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
  }

  // This method rearranges the heap after adding a new element.
  _heapifyUp() {
    // Start with the last element added to the heap
    let nodeIndex = this.size() - 1;

    // Loop until the node reaches the root or the heap property is maintained
    while (
      nodeIndex > 0 &&
      // Compare the current node with its parent
      this.comparator(
        this.heap[nodeIndex].priority,
        this.heap[this._parentIndex(nodeIndex)].priority
      ) < 0
    ) {
      // If the current node's priority is higher than its parent, swap them
      this._swap(nodeIndex, this._parentIndex(nodeIndex));
      // Move to the parent node and continue
      nodeIndex = this._parentIndex(nodeIndex);
    }
  }

  // This method rearranges the heap after removing the top element.
  _heapifyDown() {
    // Start with the root node
    let currNodeIndex = 0;

    // Loop as long as the current node has a left child
    while (this._hasLeftChild(currNodeIndex)) {
      // Assume the left child is the smaller child
      let smallerChildIndex = this._leftChildIndex(currNodeIndex);

      // Check if the right child exists and is smaller than the left child
      if (
        this._hasRightChild(currNodeIndex) &&
        this.comparator(
          this.heap[this._rightChildIndex(currNodeIndex)].priority,
          this.heap[smallerChildIndex].priority
        ) < 0
      ) {
        // If so, the right child is the smaller child
        smallerChildIndex = this._rightChildIndex(currNodeIndex);
      }

      // If the current node is smaller than its smallest child, the heap is correct
      if (
        this.comparator(
          this.heap[currNodeIndex].priority,
          this.heap[smallerChildIndex].priority
        ) <= 0
      ) {
        break;
      }

      // Otherwise, swap the current node with its smallest child
      this._swap(currNodeIndex, smallerChildIndex);
      // Move to the smaller child and continue
      currNodeIndex = smallerChildIndex;
    }
  }

  // This method rearranges the heap upwards from a given index.
  _heapifyUpFromIndex(index) {
    // Start from the given index
    let currentIndex = index;

    // Continue as long as the current index is not the root
    while (currentIndex > 0) {
      // Find the parent index of the current index
      let parentIndex = this._parentIndex(currentIndex);

      // Compare the current node with its parent
      if (
        this.comparator(this.heap[currentIndex], this.heap[parentIndex]) < 0
      ) {
        // If current node is smaller than the parent, swap them
        this._swap(currentIndex, parentIndex);
        // Move to the parent node and continue
        currentIndex = parentIndex;
      } else {
        // If the current node is not smaller than the parent, stop the process
        break;
      }
    }
  }

  // This method rearranges the heap downwards from a given index.
  _heapifyDownFromIndex(index) {
    // Start from the given index
    let currentIndex = index;

    // Continue as long as the current node has a left child
    while (this._hasLeftChild(currentIndex)) {
      // Assume the left child is the smaller child
      let smallerChildIndex = this._leftChildIndex(currentIndex);

      // Check if the right child exists and is smaller than the left child
      if (
        this._hasRightChild(currentIndex) &&
        this.comparator(
          this.heap[this._rightChildIndex(currentIndex)],
          this.heap[smallerChildIndex]
        ) < 0
      ) {
        // If so, the right child is the smaller child
        smallerChildIndex = this._rightChildIndex(currentIndex);
      }

      // If the current node is smaller or equal to its smallest child, the heap is correct
      if (
        this.comparator(
          this.heap[currentIndex],
          this.heap[smallerChildIndex]
        ) <= 0
      ) {
        break;
      }

      // Otherwise, swap the current node with its smallest child
      this._swap(currentIndex, smallerChildIndex);
      // Move to the smaller child and continue
      currentIndex = smallerChildIndex;
    }
  }
}

// Reference: https://adrianmejia.com/priority-queue-data-structure-and-heaps-time-complexity-javascript-implementation/

// class HeapWithComparitor {
//   constructor(comparator = (a, b) => a - b) {
//     this.array = [];
//     this.comparator = (i1, i2) => comparator(this.array[i1], this.array[i2]);
//   }

//   /**
//    * Insert element
//    * @runtime O(log n)
//    * @param {any} value
//    */
//   add(value) {
//     this.array.push(value);
//     this.bubbleUp();
//   }

//   /**
//    * Move new element upwards on the Heap, if it's out of order
//    * @runtime O(log n)
//    */
//   bubbleUp() {
//     let index = this.size - 1;
//     const parent = (i) => Math.ceil(i / 2 - 1);
//     while (parent(index) >= 0 && this.comparator(parent(index), index) > 0) {
//       this.swap(parent(index), index);
//       index = parent(index);
//     }
//   }

//   /**
//    * Retrieves and removes the head of this Heap or returns null if this Heap is empty.
//    * @runtime O(log n)
//    */
//   remove(index = 0) {
//     if (!this.size) return null;
//     this.swap(index, this.size - 1); // swap with last
//     const value = this.array.pop(); // remove element
//     this.bubbleDown(index);
//     return value;
//   }

//   /**
//    * After removal, moves element downwards on the Heap, if it's out of order
//    * @runtime O(log n)
//    */
//   bubbleDown(index = 0) {
//     let curr = index;
//     const left = (i) => 2 * i + 1;
//     const right = (i) => 2 * i + 2;
//     const getTopChild = (i) =>
//       right(i) < this.size && this.comparator(left(i), right(i)) > 0
//         ? right(i)
//         : left(i);

//     while (
//       left(curr) < this.size &&
//       this.comparator(curr, getTopChild(curr)) > 0
//     ) {
//       const next = getTopChild(curr);
//       this.swap(curr, next);
//       curr = next;
//     }
//   }
// }
