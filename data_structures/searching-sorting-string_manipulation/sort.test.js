import { Sort } from "./sorting.js";

const sort = new Sort();
console.log("sort.bubble([7, 1, 3, 6, 5]):", sort.bubble([7, 1, 3, 6, 5]));
console.log("\n");

console.log(
  "sort.selection([7, 3, 1, 5, 2]):",
  sort.selection([7, 3, 1, 5, 2])
);
console.log("\n");
console.log(
  "sort.insertion([7, 3, 1, 5, 2]):",
  sort.insertion([7, 3, 1, 5, 2])
);
console.log("\n");
console.log(
  "sort.mergeSort([7, 3, 1, 5, 2]):",
  sort.mergeSort([7, 3, 1, 5, 2])
);
console.log("\n");
console.log(
  "sort.quickSort([7, 3, 1, 5, 2]):",
  sort.quickSort([7, 3, 1, 5, 2])
);
console.log("\n");
