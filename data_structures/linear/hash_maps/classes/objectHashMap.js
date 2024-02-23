// IMPLEMENTING HASMAP WITH AN OBJECT

/*
to mimic a JAVA hash Map, 
types are k: in, v: String, collisions: chaining

create a private class (Entry class) 
for the pairs to be inserted in the linkedList
[LL, LL, LL, LL]
LinkedList<Entry>[]


  Assuming key: number
  value: string;
*/
// https://developer.mozilla.org/en-US/docs/Web/API/NodeList
// equivalent to linkedList with document elements

import { LinkedList } from "../../linear/LinkedList/linkedList.js";
class Entry {
  constructor(key, value) {
    this.key = key;
    this.value = value;
  }
}

export class HashMap {
  #capacity;
  #entries;
  constructor(length) {
    this.#capacity = length;
    this.#entries = new LinkedList();
  }

  // produces an index key within the boudaries of the hash map capacity
  #getHash(key) {
    return key % this.#capacity;
  }
  put(key, value) {
    const index = this.#getHash(key);

    // if the spot is not used yet
    if (this.#entries[index].length == 0) {
      // add the linkedList container
      this.#entries[index] = new LinkedList();
    }
    // iterate in the entries in that spot
    // this linkedlist is not iterable
    for (let i = 0; i < this.#entries[index].length; i++) {
      // check if exists an entry already with the same key to update,
      let entry = this.#entries[index][i];
      if ((entry.key = key)) {
        entry.value = value;
        return;
      }
    }

    // if new, add to the last position
    // wrap the key value pair in the entry class
    console.log("added new entry");
    console.log("spot", this.#entries[index]);
    const newEntry = new Entry(key, value);
    // const newEntry = { key, value };
    console.log("newEntry", newEntry);
    this.#entries[index].addLast(newEntry);
  }

  get(key) {
    const index = this.#getHash(key);
    const bucket = this.#entries[index];
    if (bucket) {
      for (let entry of bucket) {
        if ((entry.key = key)) return entry.value;
      }
    }
    return null;
  }

  remove() {}
}

const hash_map = new HashMap(5);
hash_map.put(6, "a"); // index should be 1
hash_map.put(8, "b"); // index should be 3
hash_map.put(11, "c"); // index should be 1 --> a collision should be avoided
hash_map.put(6, "a+"); // index should be 1 --> a collision should be avoided
console.log("hash_map.get(6)", hash_map.get(6));
