import { Heap } from "./classes/heap.js";

const heap = new Heap(10);
[10, 5, 17, 4, 22].forEach((i) => {
  heap.insert(i);
});

console.log("heap.remove()", heap.remove());
console.log("Done");

/*
Using heaps to sort data.
you can insert data into a heap and then put it into another array
in descending or ascending order.
*/
console.log("\nUsing heaps to sort data.");
const numbers = [4, 2, 12, 6, 8, 10];

const desc = new Array(6);
const heapSort = new Heap(6);
numbers.forEach((i) => heapSort.insert(i));
for (let i = 0; i < numbers.length; i++) {
  const removed = heapSort.remove();
  desc[i] = removed;
}

const asc = new Array(6);
const heapSort2 = new Heap(6);
numbers.forEach((i) => heapSort2.insert(i));
for (let i = numbers.length - 1; i >= 0; i--) {
  asc[i] = heapSort2.remove();
}

console.log("numbers", numbers);
console.log("desc", desc);
console.log("asc", asc);
console.log("Done");
