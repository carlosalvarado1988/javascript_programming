// IMPLEMENTING HASMAP WITH AN OBJECT

/*
to mimic a JAVA hash Tabke, 
types are k: in, v: String, collisions: chaining

create a private class (Entry class) 
for the pairs to be inserted in the linkedList
[LL, LL, LL, LL]
LinkedList<Entry>[]


  Assuming key: number
  value: string;

Note: Mosh is using [LL, LL, LL, LL] this structure with LinkedList
because in Java the pair {Key, Value} stored in a LL container makes sense
to use built in structures (a pair of data).
For javascript do, we can be more flexible and adapt.

for this exercise i use a [
    [index]Map({key1}, {key2}, {key3}), 
    [index]Map({key1}), 
    [index]Map({key1}, {key2}), 
  ]

another implementation online uses simple {} instead of Map()
https://www.educative.io/blog/data-strucutres-hash-table-javascript

*/
// https://developer.mozilla.org/en-US/docs/Web/API/NodeList
// equivalent to linkedList with document elements

// import { LinkedList } from "../LinkedList/linkedList.js";

class Entry {
  constructor(key, value) {
    this.key = key;
    this.value = value;
  }
}

export class HashTable {
  #capacity;
  #entries;
  constructor(length) {
    this.#capacity = length;
    this.#entries = []; // Should be an array of LinkedList<Entry>[]
  }

  // produces an index key within the boudaries of the hash map capacity
  #getHash(key) {
    return key % this.#capacity;
  }

  put(key, value) {
    const index = this.#getHash(key);

    // if the spot is not used yet
    if (!this.#entries[index]) {
      this.#entries[index] = new Map();
    }
    // // iterate in the entries to find if an update is needed
    // for (let i = 0; i < this.#entries[index].length; i++) {
    //   // check if exists an entry already with the same key to update,
    //   let entry = this.#entries[index].get(key);
    //   if (entry.key == key) {
    //     entry.value = value;
    //     return;
    //   }
    // }

    // if new, add to the last position
    // wrap the key value pair in the entry class
    // const newEntry = new Entry(key, value);
    // const newEntry = { key, value };

    // set here takes care of updating or adding new one.
    this.#entries[index].set(key, value);
  }

  get(key) {
    const index = this.#getHash(key);
    const bucket = this.#entries[index];

    return bucket.get(key);
    // if (bucket) {
    //   for (let entry of bucket) {
    //     if (entry.key == key) return entry.value;
    //   }
    // }
    // return null;
  }

  remove() {}
}

const hash_map = new HashTable(5);
hash_map.put(6, "a"); // index should be 1
hash_map.put(8, "b"); // index should be 3
hash_map.put(11, "c"); // index should be 1 --> a collision should be avoided
hash_map.put(6, "a+"); // index should be 1 --> a collision should be avoided -> should be updated
console.log("hash_map.get(6)", hash_map.get(6));
