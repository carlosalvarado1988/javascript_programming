// equivalent: https://developer.mozilla.org/en-US/docs/Web/API/NodeList

class NodeClass {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

export class LinkedList {
  constructor() {
    this.first = null;
    this.last = null;
    this.length = 0;

    // needed for sort function
    this.list = [];
    // this.sortingFunction =
    //   sortingFunction ??
    //   ((a, b) => {
    //     return a < b;
    //   });
  }

  printAll() {
    let current = this.first;
    while (current) {
      console.log(current.value);
      current = current.next;
    }
  }

  isEmpty() {
    return !this.first;
  }

  // private
  getPrevious(item) {
    let current = this.first;
    while (current.value) {
      if (current.next == item) return current;
      current = current.next;
    }
    return null;
  }

  addLast(item) {
    const node = new NodeClass(item);
    // if list is empty
    if (this.isEmpty()) {
      this.first = node;
      this.last = node;
    } else {
      // reference next of current pass to be the new node
      this.last.next = node;

      // actual last is the new node
      this.last = node;
    }

    // update the size
    this.length++;
    return this;
  }

  addFirst(item) {
    const node = new NodeClass(item);
    // if linkedList is empty, add first
    if (this.isEmpty()) {
      this.first = node;
      this.last = node;
    } else {
      // the new node points to the current first reference for next
      node.next = this.first;

      // set the first node to this new node
      this.first = node;
    }

    // update the size
    this.length++;
  }

  indexOf(item) {
    let index = 0; // set the initial index
    let current = this.first; // set the initial node
    while (current?.value) {
      // if the item matches the current node, return index found
      if (current.value == item) return index;

      // update node with next node and increment index
      current = current.next;
      index++;
    }

    // if not found
    return -1;
  }

  contains(item) {
    // this reuses the logic of indexOf.
    return this.indexOf(item) != -1;

    //   let current = this.first; // set the initial node
    //   while (current?.value) {
    //     // if the item matches the current node, return index found
    //     if (current.value == item) {
    //       return true;
    //     }

    //     // update node with next node
    //     current = current.next;
    //   }
    //   return false;
  }

  removeFirst() {
    // [10 -> 20 -> 30]
    // first 20.
    // point first.next node to be first node.

    // what if link is empty?
    if (this.isEmpty()) {
      throw new Error("Linked is empty");
    }

    // in case the linkedList has only 1 element, being first and last
    if (this.first == this.last) {
      this.first = null;
      this.last = null;
      this.length = 0;
      return;
    }

    // keep the second reference
    let second = this.first.next;

    // remove link from first to second == remote old first node.
    // by removing the link, the garbage colector clears the memory
    this.first.next = null;

    // convert the second in first
    this.first = second;

    // update the size
    this.length--;
  }

  removeLast() {
    // [10 -> 20 -> 30]
    // last 20.
    // get to the prev to last and set to be the last.

    // what if link is empty?
    if (this.isEmpty()) {
      throw new Error("Linked is empty");
    }

    // in case the linkedList has only 1 element, being first and last
    if (this.first == this.last) {
      this.first = null;
      this.last = null;
      this.length = 0;
      return;
    }

    // lets traverse to the right to find the second to last.
    let current = this.first;
    while (current.value) {
      if (current.next == this.last) break;
      current = current.next;
    }
    // here current has the previous to last.
    this.last = current;

    // could also separate in private method
    // const prev = getPrevious(this.last);
    // this.last = current;

    // remove the last link to be the last one.
    // by removing the link, the garbage colector clears the memory
    this.last.next = null;

    // update the size
    this.length--;
  }

  size() {
    return this.length;
  }

  toArray() {
    const array = new Array(this.length);
    let current = this.first;
    let index = 0;
    while (current?.value) {
      array[index++] = current.value;
      current = current.next;
    }
    return array;
  }

  // private
  resetLinkedList() {
    this.first = null;
    this.last = null;
    this.length = 0;
  }

  reverseReusingArrayAndAdd() {
    // [10 -> 20 -> 30]
    // [10 <- 20 <- 30]

    // think about turn around the reference.
    // transform into array to work with indexes.
    const array = this.toArray();
    // reset linkedList
    this.resetLinkedList();

    // [30 -> 20 -> 10] reversed
    for (let i = array.length - 1; i >= 0; i--) {
      this.addLast(array[i]);
    }
    // O(n2) because 2 loops
  }

  reverse() {
    if (this.isEmpty()) return;
    // [10 -> 20 -> 30]
    //  pre  curr   nxt
    //  nxt = c.next
    //  curr.next = pre
    // [10 <- 20 <- 30]

    // initiate references
    let pre = this.first;
    let curr = pre.next;
    while (curr?.value) {
      let nxt = curr.next; // preserve next reference
      curr.next = pre; // shift reference to pre
      pre = curr; // hold pre to use in next iteration
      curr = nxt; // move 1 step forward in the loop
    }

    // set the first as last now, which has not been touched
    this.last = this.first;
    this.last.next = null;
    // in the last iteration curr is null, prev is the last.
    // we assign pre to be the first
    this.first = pre;

    // O(n) because 1 loop
  }

  getKthFromTheEnd(k) {
    if (this.isEmpty()) return;
    // find the Kth node from the end of a linked list in one pass
    //[10, 20, 30, 40, 50, 60]
    // k = 1 (60)
    // k = 2 (50)
    // k = 4 (30)
    // for this solution we need 2 pointers, to do it in one pass and not loop
    let pointerA = this.first;
    let pointerB = this.first;

    const distanceReference = k - 1; // this is the equivalent of lenght - 1 as the measure of the pointers.

    for (let i = 0; i < distanceReference; i++) {
      pointerB = pointerB.next;
      // If pointerB is already greater that the length of the linkedlist,
      // we should not allow it.
      if (!pointerB) {
        console.error("K is larger than the elements available");
        return;
      }
    }
    // here the edgeB is the reference of the lenght to K.
    while (pointerB.value != this.last.value) {
      pointerA = pointerA.next;
      pointerB = pointerB.next;
    }

    return pointerA.value;
    /* my understanding is: instead of converting in array and looping back,
    the ideas is to set 2 pointes, as a "regla metrica", it helps to set the distance
    until "la regla" hit nulls.
    when the pointerB hits null its because it reached the lenght.
    the begining of the rule is the mark for the value.
    */
  }

  findTheMiddle() {
    // Find the middle of a linked list in one pass.
    /*
    As always, we start by simplifying and narrowing the problem. Let’s imagine the list has an odd number of nodes. Since we have to find the middle node in one pass, we need two pointers. The tricky part here is that we should figure out how many nodes should the first and second pointers be apart. Let’s throw a few numbers to find the relationship between these pointers. 
    Number of nodes:   1, 3, 5, 7, 9, 11
    middle node:       1, 2, 3, 4, 5, 6 
    
    Do you see a pattern here? In every row, the number of nodes is increasing by two where as the position of the middle node is increasing by one. Agreed?  So, we can define two pointers that reference the first node initially. Then, we use a loop to move these pointers forward. In every iteration, we move the first pointer one step and the second pointer two steps forward. The moment the second pointer hits the tail node, the first node is pointing the middle node.  Now, let’s expand our problem. What if the list has an even number of nodes?
    Number of nodes:   2,   4,   6,   8,  10
    middle node:      1,2  2,3  3,4  4,5  5,6

    We see the same pattern. In every step, the number of nodes increases by two whereas the position of the middle node is increasing by one. The only difference is that here we need to return two middle nodes. That’s easy. Once we find the left middle node, we’ll also return the node next to it.
    How do we know if the list has an even or odd number of items? We can declare a count variable and increment it in each step. But we don’t really need this. If the list has an even number of nodes, at the end of the last iteration, the second pointer will reference the tail node; otherwise, it’ll be null. (Try a few examples and you’ll see this yourself.) 
    */

    let a = this.first;
    let b = this.first;

    while (b != this.last && b.next != this.last) {
      b = b.next.next;
      a = a.next;
    }

    return b == this.last ? a.value : `${a.value},${a.next.value}`;
  }

  hasLoop() {}

  // ATTEMPT TO ADD: this additional method to help the bucketSort algorithm exercise which needs to sort a linkedList in its implementation
  // solution taken from here: https://stackoverflow.com/questions/69691689/sorting-a-linked-array
  // and then adapted
  // sort(sortingFunction) {
  //   if (!sortingFunction) {
  //     return false;
  //   }
  //   this.head = null;
  //   this.tail = null;
  //   const arr = this.list.map((x) => x);
  //   for (let i = 0; i < arr.length; i++) {
  //     for (let j = 0; j < arr.length; j++) {
  //       if (!arr[j + 1]?.value) {
  //         continue;
  //       }
  //       if (sortingFunction(arr[j].value, arr[j + 1].value)) {
  //         let tmp_next = arr[j].next;
  //         let tmp_prev = arr[j].previous;
  //         arr[j].next = arr[j + 1].next;
  //         arr[j].previous = arr[j + 1].previous;
  //         arr[j + 1].next = tmp_next;
  //         arr[j + 1].previous = tmp_prev;
  //       }
  //     }
  //   }
  //   this.list = arr;
  // }
}

// TESTING

const list = new LinkedList();
console.log("addlast");
list.addLast(10);
list.addLast(20);
list.addLast(30);
list.printAll();
console.log("size of the list", list.size());

console.log("\n");
console.log("addFirst");
list.addFirst(9);
list.addFirst(8);
list.printAll();
console.log("size of the list", list.size());

console.log("\n");
console.log("list.indexOf(9)", list.indexOf(9));
console.log("list.indexOf(30)", list.indexOf(30));
console.log("list.indexOf(100)", list.indexOf(100));

console.log("\n");
console.log("list.contains(30)", list.contains(30));
console.log("list.contains(100)", list.contains(100));

console.log("\n");
console.log("removeFirst");
list.removeFirst();
list.printAll();
console.log("size of the list", list.size());

console.log("\n");
console.log("removeLast");
list.removeLast();
list.printAll();
console.log("size of the list", list.size());

console.log("\n");
console.log("toArray");
list.printAll();
const array = list.toArray();
console.log("list converted to regular array  ", array);

console.log("\n");
console.log("reverse");
console.log("regular list", list.toArray());
list.reverse();
console.log("reversed list", list.toArray());

console.log("\n");
console.log("getKthFromTheEnd");
list.addLast(15);
list.addLast(25);
console.log("regular list", list.toArray());
console.log("getKthFromTheEnd(2)", list.getKthFromTheEnd(2));
console.log("getKthFromTheEnd(1)", list.getKthFromTheEnd(1));
console.log("getKthFromTheEnd(4)", list.getKthFromTheEnd(4));
console.log("getKthFromTheEnd(14)", list.getKthFromTheEnd(14));
console.log("getKthFromTheEnd(14)", list.getKthFromTheEnd(-1));

console.log("\n");
console.log("findTheMiddle");
console.log("list", list.toArray());
console.log("findTheMiddle", list.findTheMiddle());
list.addLast(35);
console.log("list", list.toArray());
console.log("findTheMiddle", list.findTheMiddle());

console.log("\n");
console.log("End LinkedList");
console.log("\n");
