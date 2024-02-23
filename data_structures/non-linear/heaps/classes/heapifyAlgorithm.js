export class MaxHeap {
  heapify(array) {
    for (let i = 0; i < array.length; i++) {
      this.#heapify(array, i);
    }
  }

  #heapify(array, index) {
    let largerIndex = index;
    let leftIndex = index * 2 + 1;
    if (leftIndex < array.length && array[leftIndex] > array[largerIndex]) {
      largerIndex = leftIndex;
    }
    let rightIndex = index * 2 + 2;
    if (rightIndex < array.length && array[rightIndex] > array[largerIndex]) {
      largerIndex = rightIndex;
    }

    if (index == largerIndex) return;

    this.#swap(array, index, largerIndex);
    this.#heapify(array, largerIndex);
  }

  #swap(array, firstIdx, secondIdx) {
    console.log("into swap");
    const temp = array[firstIdx];
    array[firstIdx] = array[secondIdx];
    array[secondIdx] = temp;
    console.log("items swapped");
  }
}
