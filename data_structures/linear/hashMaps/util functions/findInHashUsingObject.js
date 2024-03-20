// find the first non repeated character in a string

export class FindInHash {
  #getHashObject(string) {
    let hasmap = {};
    for (let char of string.toLowerCase()) {
      //   if (hasmap[char]) {
      //     hasmap[char] += hasmap[char];
      //   } else {
      //     hasmap[char] = 1;
      //   }
      hasmap[char] = ++hasmap[char] || 1;
    }
    return hasmap;
  }

  nonRepeated(string) {
    const hash = this.#getHashObject(string);
    for (let key in hash) {
      if (hash[key] == 1) return key;
    }
  }

  mostRepeated(string) {
    const hash = this.#getHashObject(string);
    const max = Math.max(...Object.values(hash));
    for (let key in hash) {
      if (hash[key] == max) return key;
    }
  }

  firstRepeated(string) {
    let hasmap = {};
    for (let char of string.toLowerCase()) {
      if (hasmap[char]) return char;
      hasmap[char] = true;
    }
  }
}

const hash = new FindInHash();
console.log("hash.nonRepeated()", hash.nonRepeated("A Green apple"));
console.log("hash.mostRepeated()", hash.mostRepeated("A Green apple"));
console.log("hash.firstRepeated()", hash.firstRepeated("A Green apple"));
