// find the first non repeated character in a string

export class FindInHash {
  #getHash(string) {
    let hasmap = new Map();
    for (let char of string.toLowerCase()) {
      const count = hasmap.has(char) ? hasmap.get(char) : 0;
      hasmap.set(char, count + 1);
    }
    return hasmap;
  }

  nonRepeated(string) {
    const hash = this.#getHash(string);
    for (let [key, value] of hash.entries()) {
      if (value == 1) return key;
    }
  }

  mostRepeated(string) {
    const hash = this.#getHash(string);
    const target = Math.max(...hash.values());
    for (let [key, value] of hash.entries()) {
      if (value == target) return key;
    }
  }

  firstRepeated(string) {
    let hasmap = new Map();
    for (let char of string.toLowerCase()) {
      if (hasmap.get(char)) return char;
      hasmap.set(char, true);
    }
  }
}

const hash = new FindInHash();
console.log("hash.nonRepeated()", hash.nonRepeated("A Green apple"));
console.log("hash.mostRepeated()", hash.mostRepeated("A Green apple"));
console.log("hash.firstRepeated()", hash.firstRepeated("A Green apple"));
