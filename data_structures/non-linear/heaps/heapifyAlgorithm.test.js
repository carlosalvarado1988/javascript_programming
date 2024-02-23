/*
implement an algorithm to convert a regular array into a heap
meaning , arrange elements so index 0 is the root (greatest value)
*/

import { MaxHeap } from "./classes/heapifyAlgorithm.js";

const numbers = [5, 3, 8, 4, 1, 2];
console.log("before numbers", numbers);

new MaxHeap().heapify(numbers);
console.log("after numbers", numbers);
