/* 
Implementation using a Map / Dictionary / Hash Map / Hash Table

This implementation has more methods

*/

class Node {
  static ALPHABET_SIZE = 26;
  constructor(value) {
    this.value = value;
    this.children = new Map();
    this._isEndOfWord = false;
  }
  //methods to provida abstraction as OOP.
  // so that we dont go assuming key access will be granted, truty or present.
  // we add a layer of abstraction to validate those conditions
  // known as SERVICES
  hasChild(char) {
    // return this.children.containsKey(char);
    return this.children.has(char);
  }
  addChild(char) {
    this.children.set(char, new Node(char));
  }

  getChild(char) {
    // testing if this refers to the node calling the method.
    // current.getChild(char) --> current == this ? ==> YES!
    return this.children.get(char);
  }
  getChildren() {
    // method to return all children in an array structure
    return this.children.values();
  }
  hasChildren() {
    return Object.keys(this.children.values()).length == 0;
  }
  removeChild(char) {
    this.children.delete(char);
  }

  // getter and setter to access current.isEndOfWord
  get isEndOfWord() {
    return this._isEndOfWord;
  }

  set isEndOfWord(val) {
    this._isEndOfWord = val;
  }
}

export class TriesWithHashMap {
  // set the parent empty root
  #root = new Node("");

  insert(word) {
    let current = this.#root;
    for (let char of word) {
      //   if (current.children.get(char) == undefined) {
      if (!current.hasChild(char)) {
        // current.children.set(char, new Map(char));
        current.addChild(char);
      }
      //   current = current.children.get(char);
      current = current.getChild(char);
    }
    current.isEndOfWord = true;
  }

  /*
  This method is to lookup for a word. you need to check for isEndOfWord to know
  the word is prevously stored and its not only a substring of other word.
  it retunrs a boolean
  */
  contains(word) {
    if (!word) return false;
    let current = this.#root;
    for (let char of word) {
      if (!current.getChild(char)) {
        return false;
      }
      current = current.getChild(char);
    }
    return current.isEndOfWord;
  }

  /*
  Pre-order: visit root first
  Post-order: visit last child first
  */

  #recursiveTraverse(root) {
    // pre-order traversal: visit the root first
    console.log(root.value);
    //now visit each child, up to 26 alphabet letters for each child level.
    for (let child of root.getChildren()) {
      this.#recursiveTraverse(child);
    }
    // post-order traversal: visit the root after
    // console.log(root.value);
  }

  /*
  public facing method, that uses recursion
  */
  traverse() {
    this.#recursiveTraverse(this.#root);
  }

  /*
  remove methods. Using recursion
  */
  #recursiveRemove(root, word, index) {
    // base condition, index reach length
    // note length does not reduce -1,
    // because root value = "",
    // we count for this first empty element
    if (index == word.length) {
      // console.log(root.value); used to confirm reverse log was good
      // here we reset the end of the word flag
      root.isEndOfWord = false;
      return;
    }

    const char = word[index];
    const child = root.getChild(char);
    if (child == null) return;

    // calling the recursive method with new child and new index
    this.#recursiveRemove(child, word, index + 1);

    //In order to remove, we do post traverse.
    // meaning we remote loop in reverse order
    // console.log(root.value); used to check reverse log is good

    if (!child.hasChildren() && !child.isEndOfWord) {
      // remove when no more children and not the end of another word.
      // this remove each one of the characters
      // this.child.removeChild(char);
      root.removeChild(char);
    }
  }
  /* piublic method */
  remove(word) {
    // early check
    if (word == null) return;

    // index 0, we visit the first index
    this.#recursiveRemove(this.#root, word, 0);
  }

  /*
    This is the AUTOCOMPLETE features
    first step is to find the node of the last letter of the prefix arg
  */
  findWords(prefix) {
    // early check, return if null
    if (prefix == null) return;
    const words = [];
    const lastNode = this.#findLastNodeOf(prefix);
    this.#recursiveFindWords(lastNode, prefix, words);
    return words;
  }

  // private method to point to the last node
  #findLastNodeOf(prefix) {
    // you start from top
    let current = this.#root;
    for (let char of prefix) {
      const child = current.getChild(char);
      // if null means prefix does not match a child chain to a word
      if (child == null) return;
      current = child;
    }
    return current;
  }

  #recursiveFindWords(root, prefix, collectedWords) {
    // when prefix does not match anything
    if (root == null) return;
    // you do a pre-order traversal
    // visit the root first, before its children
    if (root.isEndOfWord) {
      // if the root represents the end of a word,
      // we add it to the collector
      collectedWords.push(prefix);
    }

    // now, you visit each children
    for (let child of root.getChildren()) {
      this.#recursiveFindWords(child, prefix + child.value, collectedWords);
      // this line prefix + child.value makes the magic
      // it adds the autocompletion. it adds recursively and in advance the coming child until reach an end of word
    }
  }
}

/*
MORE EXERCISESS
Exercises1-  Implement the contains method recursively. 
Compare the iterative and recursive solutions.  
Solution: Trie.containsRecursive() 

2- Count the number of words in a trie.  
Solution: Trie.countWords() 

3- Given an array of strings, find the longest common prefix. 
Test your algorithm against these test cases. 
Input: [“card”, “care”]
Output: “car”
Input: [“car”, “care”]
Output: “car”
Input: [“car”, “dog”]
Output: “”
Input: [“car”]
Output: “car”
Solution: Trie.longestCommonPrefix()

*/
