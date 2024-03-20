import { LinkedList } from "../linear/LinkedList/linkedListJS.js";

export class Sort {
  #swap(arr, leftIdx, rightIdx) {
    const temp = arr[leftIdx];
    arr[leftIdx] = arr[rightIdx];
    arr[rightIdx] = temp;
  }

  // COMPARISON ALGORITHMS.
  /*
  Bubble Sort
    You scan from left to right, and swap the elements one by one.
    you pass the array many times, to move all elements left to right
        Time complexity: 
                     BEST   WORST
        Passes       O(1)   O(n)
        Comparisons  O(n)   O(n)
        -------------------------
            Total    O(n)   O(n2)
                    linear  quadratic
  */

  bubble(arr) {
    // some improvements: check if arr is already sorted, using a check variable
    let isSorted = true;
    for (let i = 0; i < arr.length; i++) {
      for (let j = 1; j < arr.length - i; j++) {
        // adding (j < arr.length - i) reduces extra comparisons.
        if (arr[j - 1] > arr[j]) {
          this.#swap(arr, j - 1, j);
          isSorted = false;
        }
      }
      if (isSorted) return arr; // in the first iteration, if no swap was needed, it means it was sorted
      // still with the improvements, its O(n)
    }
    return arr;
  }

  /*
  Selection Sort
    You need multiple passes to sort the array.
    - find the minumum item, swap it with index 0.
    - left side is sorted, right side is unsorted.
    - find the minumum item in the unsorted side, swap it with index 1.
    - left side is sorted, right side is unsorted.
    - find the minumum item in the unsorted side, swap it with index 2.

    selecting the next minimum value and place it the right position.

    you pass the array many times, to move all elements left to right
        Time complexity: 
                     BEST       WORST
        Passes       O(n)       O(n)
        Comparisons  O(n)       O(n)
        -----------------------------------
            Total    O(n2)      O(n2)
                    quadratic  quadratic
  */

  selection(arr) {
    // [1, (3), 8, 5, 2] (1)
    // [1, 3, 8, 5, 2]
    for (let i = 0; i < arr.length; i++) {
      // start with first element, we set it to i because in every new interation,
      // i is the first element to find the new smaller.
      let minIndex = i;
      for (let j = i; j < arr.length; j++) {
        if (arr[j] < arr[minIndex]) minIndex = j;
      }
      // note the array will be swap, altering the original array.
      // improv added
      if (minIndex != i) {
        this.#swap(arr, minIndex, i);
      }
      //swap min(1)3 -> (1)3
      //swap min(1)3 -> (2)8
      //swap min(1)3 -> (3)5
      //swap min(4)2 -> (1)3 ---
      // this.#swap(arr, minIndex(j or i), i =1);
      // its taking minIndex to compare with all the above indexes.
      // if does a swap, by updating minIndex and then it actually moves items.
      // one improv can be compare if minIndex != i
    }
    // returning original arr to display in test
    return arr;
  }

  /*
  Insertion Sort
   Think of it as a cards game. you receive one card and you decide to insert it in the righ position each time.
    - one diff is you dont swap elements, instead you shift all elements to the right to create a space in the left.
    - this shift operation applies when you insert the element all they way in the left or at any point in the middle.
    - the same way you position at the end of the arr if its the greater.
    - elements in the left side will be sorted, elements in the right side will be unsorted during the iteration

    diff: ShiftRight instead of Swap operations.

    you pass the array many times, to move all elements left to right
        Time complexity: 
                     BEST       WORST
        Iteration    O(n)       O(n)
        Shift Item   O(1)       O(n)
        -----------------------------------
            Total    O(n)      O(n2)
                    linear  quadratic
  */

  insertion(arr) {
    // we start at the second element to compare against the one on the left. i = 1
    for (let i = 1; i < arr.length; i++) {
      let current = arr[i]; // store temp the value to shift if needed
      // we loop thru all the items in the left so we compare and decide to shift if needed
      // we go from right to left (starting from the element next to the left of i), so that
      // we capture the value and move it to the right (shift) without loosing any item value.
      //   let j = i - 1;
      //   while (j >= 0 && arr[j] > current) {
      //     arr[j + 1] = arr[j];
      //     j--;
      //   }

      // note: to make the loop work as the while
      // we need a separate variable to track insertion index from index inspection
      // initially the for loop didnt work because we keep decrementing j (j--) even when not "arr[j] > current"

      // [1, 3, 8, 5(3), 2]
      let insert_index = i - 1; // i = 3, insert_index = 2
      for (let idx_check = insert_index; idx_check >= 0; idx_check--) {
        // if we find an item greater than our current,
        // we shift it to the right one position.
        // we basically move the insertion space to the left one position.
        // our insertion space is J index.
        if (arr[idx_check] > current) {
          // 8 > 5 (item to insert is hold in current)
          // [1, 3, 8, 5, 2] = [1, 3, 8, 8, 2]
          arr[idx_check + 1] = arr[idx_check];
          insert_index--; // 1
        }
      }

      //  now we insert the current at J + 1 = 1+1 = 2
      arr[insert_index + 1] = current;
      // [1, 3, 8, 8, 2] = [1, 3, 5, 8, 2]
    }
    return arr;
  }

  /*
  Merge Sort 
    This is known as a DEVIDE AND CONQUER ALGORITHM.
    All the previous methods run in quadratic O(n2), 
    Merge method runs in O(n log n), by breaking down a list into smaller pieces in each iteration
    then merge the pieces back into one complete list
    this with a cost of SPACE, because we use extra spaces (arr) to split and merge operations.
        - we use recursion to devide arrays.
        
    Time complexity: 
                     BEST       WORST
        Deviding   O(log n)   O(log n)
        Merging     O(n)       O(n)
        -----------------------------------
         Total    O(n log n)  O(n log n)
        
    Space complexity: 
                     BEST       WORST
        Deviding     O(n)       O(n)   * Every split generate 2 sub arrays that together have the same space of the parent.
        Mergin                         * No need to create more arrays to merge, just copy items into the input array.
                                    
        -----------------------------------
         Total       O(n)       O(n)

    NOTE: the is one implementation that does not take extra space, named: In-place MergeSort.
  */

  mergeSort(arr) {
    // since this is going to be call within a parent function that is to be called recursively
    // we need a base condition to stop it, when should we stop?
    // answer: when we have an array with a single item, this is already sorted to start mergin
    if (arr.length < 2) return;

    // devide this arr into half
    const middle = Math.floor(arr.length / 2);
    let left = new Array(middle); // new array with the size of middle
    for (let i = 0; i < middle; i++) {
      left[i] = arr[i];
    }
    let right = new Array(arr.length - middle); // new array with the size of middle
    for (let i = middle; i < arr.length; i++) {
      right[i - middle] = arr[i]; // [i - middle] calculating the correct index for right
    }

    // sort each half
    this.mergeSort(left);
    this.mergeSort(right);
    // NOTE this.merge refers to the method in the class, and merge below refers to the inner arrow function
    // JS engine distinguish both, best practice is to be descriptive wth names
    // so i rename to mergeSort

    // this is another implementation of a private method in a class since its not public to the interface
    const merge = (left, right, result) => {
      // start 3 pointers in 0
      let i = 0,
        j = 0,
        k = 0;

      //  loop from lower to greater on each side, while still within boundaries
      while (i < left.length && j < right.length) {
        // find if left element is less or equal than right
        if (left[i] <= right[j]) {
          // if so, store in result, then increment both pointers.
          result[k++] = left[i++];
        } else {
          // otherwise we take the right element and increment both pointers too
          result[k++] = right[j++];
        }
      }
      // both arrays could have diff length, perhaps one side have a left over to check
      // if there are remainders, we copy all of the in the results array.
      // we do it in both sides
      while (i < left.length) result[k++] = left[i++];
      while (j < right.length) result[k++] = right[j++];
    };
    // merge the result
    merge(left, right, arr);
    return arr;
  }

  /*
  Quick Sort 
    built-in in many languages, fairly efficient, does not require extra space
    it sorts an array in place
        - you select an item called a PIVOT
        - you create a partition:
            - All items smaller than PIVOT are in the left.
                - it doesn't matter if thay are sorted or not
            - All items greater than the PIVOT are in the right
                - it doesn't matter if they are sorted or not
        - Typically you select the LAST ITEM as the PIVOT (there are other implementations for the pivot as well)
        - in every iteration, we select a new pivot as the last itme in each partition, and reorder items around the new pivot
        - the result of iterating to the left (lower items) is that the right side is resulting ordered (greater)
            - this is why its the solution is almost reduced in half (log n) 

    About Partitioning
        - you use two pointers
            - i = to iterate in items
            - b = to determine the boundaries of the partition (which will change recursively)
                - think of b (boundary) as the end of the left partition (< pivot)
                - b = -1 at the beginning. to start at the left prior to 0.
            - in every iteration, 
                - if item > pivot ignore it.
                - if item < pivot:
                    - move boundary (b) 
                    - swap items 
            

    Time complexity: 
                        BEST       WORST
        Partitioning   O(n)         O(n)   * you need to iterate all the items.
        # of times     O(log n)     O(n)   * times can be different each time, could be in half O(log n) or at one side having a long side as long as n (number of items)
        -----------------------------------
         Total      O(n log n)      O(n2)  
                    * with a good Pivot Selection (1).
    Space complexity: 
        Space          O(log n)     O(n)   * The same as # of times, as it matters of the number of partitions that can be made.
        
    (1) Pivot selection: 
        - Pivot selection does not eliminate worst case scenario but slighly reduce it.
        - some pivot selection strategy are:
            - Pick randomly
            - use the middle index
            - average of first, middle and last item.
        - in general, last item as index is the most common technique. 

    NOTE: Overall prefer quick sort over merge sort, they both have O(n log n) for complexity but quick sort requires less space.
  */

  quickSort(arr) {
    return this.#quickSort(arr, 0, arr.length - 1);
  }

  /*
    The idea is to recursively call the partitions. for an array with 10 items.
    (arr, 0, 9)
        pivot: 4
            left: (0,3)
            right: (4,9) 
  */
  #quickSort(arr, start, end) {
    // this recursive method needs a base condition to stop.
    // when a single item (=) or an empty array (>).
    if (start >= end) return;
    // partition: pivot that we assume is the last of the array.
    const boundary = this.#partition(arr, start, end);
    // sort left:
    this.#quickSort(arr, start, boundary - 1);
    // sort right:
    this.#quickSort(arr, boundary + 1, end);
    // taking the modified arr back for log, after recursive #quickSort
    return arr;
  }

  // private method
  #partition(array, start, end) {
    // const pivot = array[array.length - 1];  * modifying the partition to be reused in inner segments.
    const pivot = array[end];
    // let boundary = -1;  * modifying the partition to be reused in inner segments.
    let boundary = start - 1;
    // for (var i = 0; i < array.length; i++) {   * modifying the partition to be reused in inner segments.
    for (var i = start; i <= end; i++) {
      if (array[i] <= pivot) {
        //   boundary++;  -> a cleaner way is to increment first, then operate boundary
        this.#swap(array, i, ++boundary);
      }
    }
    return boundary;
  }

  // NON-COMPARISON ALGORITHMS.

  /*
  Counting Sort 
    Non-comparison sort algorithm, use basic math.
    having an array [0,K] where K is the max item in the array.
    - we need to figure out how many times each item appears.
    - we use another array to count.
        - each iteration updates the count in the second array.
        - the index of the array represent the item value to count.
        - that way we have the count ocurrances for each item.
    
    - then we iterate over the second array to fill out the first array
    in an ordered manner.
    - for every occurance > 0, we take the index as the value and we introduce it back in the array
    - looping from lower to greater, we get the sorted array.

    Time complexity: 
                          BEST       
        
        Populate counts    O(n)   * the iteration over all elements of the array.
        Iterate counts     O(k)   * the iteration over all elements of the counting array.
        -----------------------------------
         Total             O(n)   
                    * Linear time much faster than previous, at a cost.
    Space complexity: 
        Space              O(K)   * K is the max item value, meaning the last index of the array in the 2nd array.
        

    NOTE: This algorith is a Time-memory Trade-off, over the others.
        - Use when allocating extra space is not an issue
        - when values are positive integers
        - when most values in the range are present, so not many indexes with 0 counts in the counting array.
  */

  countingSort(arr) {
    const max = Math.max(...arr); // get the max value in the array to set the max length

    const counts = new Array(max + 1).fill(0);
    for (let item of arr) {
      //   counts[item] = (counts[item] || 0) + 1;
      counts[item]++; // by adding + 1).fill(0) i can use the counts[item]++, because they already have numeric values to increment
    }

    // to keep track of the index to refill.
    let k = 0;
    // loop to refill with counting array.
    for (let i = 0; i < counts.length; i++) {
      // loop over the value found, to make a repeated refill in the original array
      for (let j = 0; j < counts[i]; j++) {
        arr[k++] = i;
      }
    }
    return arr;
  }

  /*
  Bucket Sort 
    Non-comparison sort algorithm, use basic math.
    
    The idea is to distribute items in a number buckets
    sort the buckets with another algorithm.
    which takes less time than sorting a big array.

    plus, we could sort them in parallel - out of this implementation.
      
    - how many buckets? it affects performance, the more we have, more memory, but less time to sort with less items. No magic number here.
    - which bucket we store an item? formula: bucket = item / numberOfBuckets
    - sort buckets independenly, any algorithm, it doesnt matter.
    - we iterate the buckets to refill the original array.


    Time complexity: 
                            BEST     WORST  
        
        Distribution         O(n)     O(n)         * the iteration over all items of the array.
        Iterating buckets    O(k)     O(k)          * the iteration over all buckets, sort each list and put items back in input array.
        Sorting              O(1)     O(n2)        * best sceario only 1 element in bucket, to the cost of more space. worst is dependent of sorting algorithm selected.
        -------------------------------------------------
         Total             O(n + k)    O(n2)
                    
    Space complexity: 
         Space           O(n + k)    * the additional array will have k = # of buckets, each bucket is a linked list with n # of items.

    NOTE: This algorith is a Time-memory Trade-off.
        - More buckets = less time, faster.
        - Less buckets = more time, slower.
  */

  bucketSort(arr, numberOfBuckets) {
    // create a linkedList of integers
    // type: List<List<Integer>>>
    // const buckets = new LinkedList();
    // an equivalent array with linkedList in the values

    // needs to do a loop to create the linkedList independently

    // const buckets = new Array(numberOfBuckets).fill(new LinkedList()); // this solution is a reference to the same object, so every insert was added to the same instance
    const buckets = new Array(numberOfBuckets);
    for (let i = 0; i < numberOfBuckets; i++) {
      buckets[i] = new LinkedList();
    }

    // iterate and distribute
    for (let item of arr) {
      // accessing the LinkedList object by its index, then adding the item in the linkedList
      const idx = Math.floor(item / numberOfBuckets);
      buckets[idx].insert(item);
    }

    // refactor option
    // const buckets = this.#createBuckets(arr, numberOfBuckets);

    let i = 0; // a variable to keep track of each refill insert to the input array
    // iterate to sort each bucket
    for (let bucket of buckets) {
      // use any sorting method.
      //   Collections.sort(bucket); // a java util method to sort the param object, it accepts a LinkedList
      // had to get a linkedList from interent to get a version with sort.
      bucket.mergeSort();

      for (let item of bucket.iterator()) {
        // with the bucket sorted, refill the input arr
        arr[i++] = item.value;
      }
    }
    return arr;
  }
  //   #createBuckets(arr, numberOfBuckets) {
  //     // create a linkedList of integers
  //     // type: List<List<Integer>>>
  //     // const buckets = new LinkedList();
  //     // an equivalent array with linkedList in the values
  //     const buckets = new Array(numberOfBuckets).fill(new LinkedList());

  //     // iterate and distribute
  //     for (let item of arr) {
  //       // accessing the LinkedList object by its index, then adding the item in the linkedList
  //       buckets[item / numberOfBuckets].addLast(item);
  //     }
  //     return buckets;
  //   }
}
