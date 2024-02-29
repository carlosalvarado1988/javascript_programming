import { Search } from "./search.js";

const search = new Search();
console.log("linearSearch  on [7, 1, 3, 6, 5]");
let arr = [7, 1, 3, 6, 5];
console.log("search.linearSearch(arr, 3):", search.linearSearch(arr, 3));
console.log("search.linearSearch(arr, 6):", search.linearSearch(arr, 6));
console.log("search.linearSearch(arr, 7):", search.linearSearch(arr, 7));
console.log("search.linearSearch(arr, 70):", search.linearSearch(arr, 70));
console.log("\n");

console.log("binary search on [1, 3, 5, 7, 9]");
arr = [1, 3, 5, 7, 9];
console.log("search.binarySearchRec(arr, 5):", search.binarySearchRec(arr, 5));
console.log("search.binarySearchRec(arr, 1):", search.binarySearchRec(arr, 1));
console.log("search.binarySearchRec(arr, 7):", search.binarySearchRec(arr, 7));
console.log("search.binarySearchRec(arr, 8):", search.binarySearchRec(arr, 8));
