// Implementation from: https://stackoverflow.com/questions/69691689/sorting-a-linked-array
// Using a more efficient sorting algorithm

export class LinkedList {
  constructor(sortingFunction) {
    this.head = null; // Initialise with null explicitly
    this.tail = null;
    this.list = [];
    this.sortingFunction =
      sortingFunction ??
      ((a, b) => {
        return a < b;
      });
  }

  some(func) {
    // I adapted this to use the iterator
    for (const node of this.iterator()) {
      if (func(node)) {
        return node.previous == null
          ? this.head
          : this.list[node.previous].next;
      }
    }
    return -1;
  }

  forEachInOrder(func) {
    // I adapted this to use the iterator
    for (const node of this.iterator()) func(node);
  }

  *iterator() {
    let current = this.head;
    while (current != undefined) {
      const node = this.list[current];
      current = node.next; // <--- move this here!
      yield node;
    }
  }

  insert(value) {
    if (this.head == null) {
      // Avoid using list.length
      this.head = this.list.length; // While here it is appropriate to use list.length!
      this.tail = this.list.length;
      this.list.push({ value, next: null, previous: null });
      return 0;
    }
    let nodeToInsert = { value, next: null, previous: null };
    let indexToInsert = this.head;
    let nthnode = this.list[this.head];
    while (nthnode && this.sortingFunction(nthnode.value, value)) {
      indexToInsert = nthnode.next;
      nthnode = this.list[indexToInsert];
    }
    if (indexToInsert === null) {
      // new tail (biggest)
      nodeToInsert.previous = this.tail;
      this.list[this.tail].next = this.list.length;
      this.tail = this.list.length;
    } else if (indexToInsert === this.head) {
      // new head (smallest)
      nodeToInsert.next = this.head;
      this.list[this.head].previous = this.list.length;
      this.head = this.list.length;
    } else {
      nodeToInsert.next = indexToInsert;
      this.list[this.list[indexToInsert].previous].next = this.list.length;
      nodeToInsert.previous = this.list[indexToInsert].previous;
      this.list[indexToInsert].previous = this.list.length;
    }
    this.list.push(nodeToInsert);
    return 1;
  }

  reverse() {
    for (const node of this.iterator()) {
      [node.next, node.previous] = [node.previous, node.next];
    }
    [this.head, this.tail] = [this.tail, this.head];
  }

  sort(sortingFunction) {
    if (!sortingFunction) return false;
    let dirty = true;
    while (dirty) {
      // Removed dependency on length
      dirty = false;
      let prevNode = null;
      // Iterate in the current order, so by following the links:
      for (const currNode of this.iterator()) {
        // Requires the change in the generator
        if (prevNode && sortingFunction(currNode.value, prevNode.value)) {
          // Get the indexes of the current pair of nodes:
          let currIndex = prevNode.next;
          let prevIndex = currNode.previous;
          // Update links from outer neighbors to these two nodes
          if (currNode.next != null)
            this.list[currNode.next].previous = prevIndex;
          else this.tail = prevIndex;
          if (prevNode.previous != null)
            this.list[prevNode.previous].next = currIndex;
          else this.head = currIndex;
          // Update links from these two nodes to outer neighbors:
          currNode.previous = prevNode.previous;
          prevNode.next = currNode.next;
          // Update links between the two nodes themselves:
          prevNode.previous = currIndex;
          currNode.next = prevIndex;
          dirty = true;
        } else {
          prevNode = currNode;
        }
      }
    }
  }

  // Added this method which can also be of use for algorithms that use partitioning
  splice(head, tail) {
    // Remove this slice from the current linked list
    if (tail != this.tail)
      this.list[this.list[tail].next].previous = this.list[head].previous;
    else this.tail = this.list[head].previous;
    if (head != this.head)
      this.list[this.list[head].previous].next = this.list[tail].next;
    else this.head = this.list[tail].next;
    this.list[tail].next = null;
    this.list[head].previous = null;
    // Wrap the removed slice into a new linked list instance, but one that shares the memory list
    let slice = new LinkedList(this.sortingFunction);
    slice.list = this.list;
    slice.head = head;
    slice.tail = tail;
    return slice;
  }

  mergeSort(sortingFunction) {
    if (!sortingFunction || this.head == null || this.head == this.tail) return; // base case
    // Find last node of first half
    let fastIter = this.iterator();
    fastIter.next();
    let half;
    for (half of this.iterator()) {
      if (fastIter.next().done || fastIter.next().done) break;
    }
    // Split list into two halves
    let right = this.splice(half.next, this.tail);
    let left = this; // ...what remains after the splice.

    // Recursively sort the two shorter lists
    left.mergeSort(sortingFunction);
    right.mergeSort(sortingFunction);
    // Make sure the "left" sublist is the one with a head value that comes before the other head value
    if (
      sortingFunction(this.list[right.head].value, this.list[left.head].value)
    )
      [left, right] = [right, left];
    // Merge the two sorted lists
    let tailIndex = left.head;
    let otherIndex = right.head;
    for (
      let currIndex = this.list[tailIndex].next;
      currIndex != null || otherIndex != null;
      currIndex = this.list[tailIndex].next
    ) {
      if (
        currIndex == null ||
        (otherIndex != null &&
          sortingFunction(
            this.list[otherIndex].value,
            this.list[currIndex].value
          ))
      ) {
        this.list[tailIndex].next = otherIndex;
        this.list[otherIndex].previous = tailIndex;
        tailIndex = otherIndex;
        otherIndex = currIndex;
      } else {
        tailIndex = currIndex;
      }
    }
    this.head = left.head;
    this.tail = tailIndex;
  }

  print() {
    // I adapted this a bit to get more condense output and add a call to printInOrder
    console.log(JSON.stringify(this.list));
    console.log(
      "Head:",
      this.head,
      "\nTail:",
      this.tail,
      "\nDefault is ascending order."
    );
    this.printInOrder();
  }

  printInOrder() {
    // I adapted this to use your nice iterator()
    console.log(...Array.from(this.iterator(), (node) => node.value));
  }
}

// const linked = new LinkedList();

// linked.insert(100);
// linked.insert(30);
// linked.insert(50);
// linked.insert(400);
// linked.insert(10);
// linked.insert(200);
// linked.insert(-90);

// console.log("When each node is sorted when it is inserted:");

// linked.print();

// linked.mergeSort((a, b) => {
//   return a > b;
// });

// console.log("Now, when re-sorted:");

// linked.print();
