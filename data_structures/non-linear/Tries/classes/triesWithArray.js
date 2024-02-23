/*
Tries always have a parent node that is empty

INSERT: insert CAT
declare root, ask do you have child for C, if not create child C.
THEN ask for C, do you have a child for A, if not create child A,
THEN ask for A, do you have a child for T, if not create child T.

Here we have the structure for CAT prefix

The structure is

Trie 
    Node:
        value: string
        children: Node[26] (for all letters in the alphabet)
        isEndOfWord: bool
    
    insert(word: string) {
        how to know which index of children array to store each letter?
        formula:
            index = letter - letter --> javascript convert characters to a numeric value
            eg. d(100) - a(97) = 3 --> index to store D is 3 then.

    }
      
*/

/* 
This implementation uses an array.
Which is not very efficient with memory usage
we are allocating 26 spaces for each array for the alphabet for all possible children letters
this is the ground implementation with only insert method.

The other option would be to use a Map / Dictionary / Hash Map / Hash Table
*/

class Node {
  static ALPHABET_SIZE = 26;
  constructor(value) {
    this.value = value;
    this.children = new Array(this.ALPHABET_SIZE);
  }
}

export class TriesWithArray {
  // set the parent empty root
  isEndOfWord = false;
  #root = new Node("");

  insert(word) {
    let current = this.#root;
    for (let char of word) {
      let index = char.charCodeAt(0) - "a".charCodeAt(0);

      if (current.children[index] == undefined) {
        current.children[index] = new Node(char);
      }
      current = current.children[index];
    }
    this.isEndOfWord = true;
  }
}
