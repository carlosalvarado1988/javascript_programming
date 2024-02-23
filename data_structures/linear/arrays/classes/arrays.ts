"use strict";

// ############### Playing with array remove element
// let numbers: number[] = [10, 20, 30];
// const indexToRemove = numbers.indexOf(20);
// numbers.push(40, 50);
// const part1 = numbers.slice(0, indexToRemove);
// const part2 = numbers.slice(indexToRemove + 1);
// const newArray = part1.concat(part2);

// // The splice() method of Array instances changes the contents of an array by removing or replacing existing elements and/or adding new elements in place.
// // MUTATING METHOD, modifying numbers reference,
// const newArray2 = numbers.splice(indexToRemove, 1);
// console.log("🚀 ~ file: index.ts:17 ~ newArray2:", newArray2);
// console.log("🚀 ~ file: index.ts:17 ~ numbers:", numbers);
// // how to do it with toSpliced(): create a new array with a segment removed and/or replaced without mutating the original array

// ############### Playing with array custom class

// for now declaring private methods
// outside the scope of the class but within its closure
// let _length: number;
// let _items: number[];

// Array with limit Length

export class ArrayWithLimitedLength {
  private items: number[];
  private _elementsCount = 0;

  constructor(private length: number) {
    this.items = new Array(length);
  }

  print(): void {
    // we use the this._elementsCount as a reference to the limit to print
    for (let i: number = 0; i < this._elementsCount; i++) {
      console.log(this.items[i]);
      // another way
      // this.items.forEach((i) => {
      //   console.log(i);
      // });
    }
  }
  get isFull(): boolean {
    return this._elementsCount === this.items.length;
  }

  insert(item: number): void {
    if (this.isFull) {
      console.error("array is full");
    }
    this.items[this._elementsCount++] = item;
  }

  removeAt(index: number): number {
    // validate index, no -1
    if (index < 0 || index > this._elementsCount) {
      console.error("Invalid index to remove");
    }
    // shift the items to the left to fill the hole
    for (let i = index; i < this._elementsCount; i++) {
      // starting in the remove index, we assign the next value to replace the current i.
      this.items[i] = this.items[i + 1];
    }
    // this leaves with an extra number in the this.items array.
    // we cut this._elementsCount reference
    this._elementsCount--;
    // to keep array consistent. do a pop to clean
    return this.items.pop()!;
  }

  indexOf(item: number): number {
    // if found return the index
    for (let i = 0; i < this._elementsCount; i++) {
      if (this.items[i] === item) {
        return i;
      }
    }
    // if not found, return -1
    return -1;
  }

  //Extend the Array class and add a method to reverse the array. For example, if the array includes [1, 2, 3, 4], after reversing and printing it, we should see [4, 3, 2, 1].
  reverse(): number[] {
    let newA: number[] = [];
    for (let i = this._elementsCount - 1; i >= 0; i--) {
      newA.push(this.items[i]);
    }
    return newA;
  }

  // Extend the Array class and add a new method to insert an item at a given index
  insertAt(item: number, index: number): void {
    // validate index is within items array
    if (index < 0 || index > this._elementsCount) {
      console.error("Invalid index to insert");
    }

    if (this.isFull) {
      console.error("array is full");
    }

    // move elements to the right,
    // from right to left, move the elements one position until move the element in the index.
    // until now, we have duplicated value in index and next to the index.
    for (let i = this._elementsCount - 1; i >= index; i--) {
      this.items[i + 1] = this.items[i];
    }

    // add element at given index / replace the duplicated,
    this.items[index] = item;
    this._elementsCount++;
  }

  insertAtWithES6(item: number, index: number): void {
    // preparing the new count for print
    this._elementsCount++;

    // using spread
    this.items = [
      ...this.items.slice(0, index),
      item,
      ...this.items.slice(index),
    ];
  }

  insertAtWithES6Splice(item: number, index: number): void {
    // The splice() method is used to change an array by adding, removing, or replacing elements. This method modifies the original array.
    this.items.splice(index, 0, item);
    this._elementsCount++;
  }
}
