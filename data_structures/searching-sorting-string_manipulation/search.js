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
            BEST O(log2N) -> every iteration time is devided by 2. (log2)
        Space complexity: 
            Recursive O(log2N)  Iterative O(1) (note that the recursive space notation is so minimal - 1Million = 19 (1Mlog2 = 19), it does not matter)
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

  /*
  Ternary Search
      The list needs to be sorted already
      We devide the list in 3 parts, each of those will go narrowing down.
      formula:
        partitionSize = (right - left) / 3
          mid1 = left + partitionSize
          mid2 = right - paritionSize

        Time complexity:
            BEST O(log3N) -> every iteration time is devided by 3. 
            note: One can think log3 is faster than log2 of Binary search, but in fact, there are more if statements in ternary search that increases computation in large lists.
            for this reason, Binary search is more efficient that Ternary search
        Space complexity: 
            Recursive O(logN)  Iterative O(1) (note that the recursive space notation is so minimal - 1Million = 19 (1Mlog2 = 19), it does not matter)
  */
  ternarySearchRec(arr, target) {
    return this.#privateTernarySearchRecursive(arr, target, 0, arr.length);
  }

  #privateTernarySearchRecursive(arr, target, left, right) {
    // adding the base condition
    if (left > right) return -1;

    // implementing logic of the recursion
    let partitionSize = Math.floor((right - left) / 3);
    let mid1 = left + partitionSize;
    let mid2 = right - partitionSize;

    // some comparisons. they can be in many orders
    if (arr[mid1] == target) return mid1;
    if (arr[mid2] == target) return mid2;

    // figure out which partion could be with recursion

    // checking the left partition
    if (target < arr[mid1])
      return this.#privateTernarySearchRecursive(arr, target, left, mid1 - 1);

    // checking the right partition
    if (target > arr[mid2])
      return this.#privateTernarySearchRecursive(arr, target, mid2 + 1, right);

    // if not yet, checking the middle partition
    return this.#privateTernarySearchRecursive(arr, target, mid1 + 1, mid2 - 1);
  }

  /*
  Jump Search
      the list needs to be sorted already
      an improved version of Linear search,
      it divides the list in 3 blocks, then in performs a linear search on the target block only.
    it uses 2 pointers (start and next) to identify the 3 blocks divisions.
    the pointers move and we need to check for 2 edge cases:
      * when the start pointer falls out. start => end.
      * when the next pointer falls out. next => end. 
        
    Time complexity: O(^n) square root of n. (raiz cuadrada de n)
  */
  jumpSearch(array, target) {
    // determine the size of the block
    const blockSize = Math.floor(Math.sqrt(array.length));
    let start = 0;
    let next = blockSize;

    // check for the edge case for start. && check for target is within the index of the last item of the current block
    while (start < array.length && array[next - 1] < target) {
      start = next;
      next += blockSize;
      // check for the edge case for next.
      if (next > array.length) {
        next = array.length;
      }
    }
    // after the while loop we potentially have a block with the target value
    // so we do a lienarSearch
    for (let i = start; i < next; i++) {
      if (array[i] == target) return i;
    }
    // if not found, -1
    return -1;
  }

  /*
  Exponential Search
      the list needs to be sorted already
      an improved version of Binary search,
      it divides the list in many blocks, each block doubles the size of the previous one in exponential scale.

    it uses 1 pointer (bound) to increase the size of the block each time
    - the bound always starts on 1 and increases in doubles.
    - When the bound is greater than the target.
    - you select the last bound with the current bound as the only segment to inspect.
    - over the segment you perfrom a binarySearch

        
    Time complexity: O(log i) i represents the largest cut the bound can take to identify a segment. 
  */
  exponentialSearch(arr, target) {
    let bound = 1;
    while (bound < arr.length && arr[bound] < target) {
      // if (bound < arr.length) {
      //   break;
      // }
      bound *= 2; // Double the bound
    }
    const left = bound / 2; // the previous bound
    const right = Math.min(bound, arr.length - 1); // limit the greater bound or the last of the arr

    return this.#privateBinarySearchRecursive(arr, target, left, right);
  }
}
