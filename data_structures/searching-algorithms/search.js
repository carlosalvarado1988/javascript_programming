export class Search {
  /*
    Linear Search
        A simple loop over all the elements to get the index of the element found, if not -1
          Time complexity: BEST O(1) WORST O(n)
    */
  linearSearch(arr, target) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] == target) return i;
    }
    return -1;
  }

  /*
    Binary Search
        Only works on ordered lists
        formula (left + right) / 2
          Time complexity:
              BEST O(logN) -> every iteration time is devided by 2. (log2)
          Space complexity: 
              Recursive O(logN)  Iterative O(1) (note that the recursive space notation is so minimal - 1Million = 19 (1Mlog2 = 19), it does not matter)
    */
  binarySearchRec(orderedArr, targetNumber) {
    return this.#privateBinarySearchRecursive(
      orderedArr,
      targetNumber,
      0,
      orderedArr.length - 1
    );
  }
  // private recursive method
  #privateBinarySearchRecursive(orderedArr, targetNumber, leftIdx, rightIdx) {
    // base condition, needed to go out of the recursive loop
    if (rightIdx < leftIdx) return -1;

    let middle = Math.floor((leftIdx + rightIdx) / 2); // on JS - ensure we use Math.floor to get down those decimals.

    if (orderedArr[middle] == targetNumber) return middle;

    if (targetNumber < orderedArr[middle]) {
      return this.#privateBinarySearchRecursive(
        orderedArr,
        targetNumber,
        leftIdx,
        middle - 1
      );
    }

    // else: orderedArr[middle] > targetNumber (else removed cuz return jumps out)
    return this.#privateBinarySearchRecursive(
      orderedArr,
      targetNumber,
      middle + 1,
      rightIdx
    );
  }

  binarySearchIter(orderedArr, targetNumber) {
    let leftIdx = 0;
    let rightIdx = orderedArr.length;

    while (leftIdx <= rightIdx) {
      let middle = Math.floor((leftIdx + rightIdx) / 2); // on JS - ensure we use Math.floor to get down those decimals.
      if (orderedArr[middle] == targetNumber) return middle;

      if (targetNumber < orderedArr[middle]) {
        rightIdx = middle - 1;
      } else {
        leftIdx = middle + 1;
      }
    }
    return -1;
  }
}
