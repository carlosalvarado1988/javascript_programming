export class StringUtils {
  /*
    I. Find the number of vowels in a string. Vowels in English are A, E, O, U and 
Input: “hello”
Output: 2 
    */
  static countVowels(string) {
    if (!string) return 0;
    let count = 0;
    const vowels = "aeiuo";
    for (let char of string.toLowerCase()) {
      if (vowels.indexOf(char) != -1) count++;
    }
    return count;
  }

  /*
  2- Reverse a string.  
Input: “hello”
Output: “olleh” 
*/

  static reverseString(string) {
    let reversed = "";
    let i = string.length - 1;
    let j = 0;
    // we could use a stack but its more performant to iterate in reverse
    while (i >= 0) {
      // the loop itself is a o(n)
      reversed += string.charAt(i); // O(n) as it loops thru the string and creates a second string to return (strings are immutable)
      //   reversed += string[i]; // The second way requires ECMAScript 5 support (and not supported in some older browsers).
      i--;
    }
    // time complexity is O(n2)
    // how to improve it. Java offers String Builder to append a characther O(1), instead of O(n) =+ duplicate an immutable string.
    return reversed;
  }
  /*
    3- Reverse the order of words in a sentence.  
    Input: “Trees are beautiful”
    Output: “beautiful are Trees” 
*/
  static reverseOrderOfWords(string) {
    if (!string) return null;
    let words = string.split(" ");
    let reversedWords = "";
    // same approvach as previous exercise
    for (let i = words.length - 1; i >= 0; i--) {
      reversedWords += `${words[i]} `;
    }
    return reversedWords.trim();
  }

  /*
4- Check if a string is a rotation of another string.
Input: “ABCD”, “DABC” (rotate one char to the right)
Output: true 
Input: “ABCD”, “CDAB” (rotate two chars to the right)
Output: true 
Input: “ABCD”, “ADBC”
Output: false 
*/
  static checkRotationOfAnotherString(string1, string2) {
    // performa a circular check, all elements should be match from left to right
    // hits, it always has the same characters, and always in sequence order
    // if we end in the string, we need to check the beginning.
    // ABCD -> All possible options: DABC, CDAB, BCDA, ABCD;
    // One way, iterating.
    // iterate and check similar characters in sequence until one reach the length, then take the index to the beginning.
    // this this you need 2 pointers.
    // second way, using extra space.
    // to have a long sequence and check for a match substring within in.
    // Concat strin1 twice, ABCDABCD, then check for contains of substrig 2.
    // could fall within any 4 spaces to match the sequence

    //    Solution
    /*
    if (string1.length != string2.length) return false; // it always has the same characters
    if ((string1 + string1).includes(string2)) return true; // Concat strin1 twice, ABCDABCD, then check for contains of substrig 2.
    return false; // other cases, its false
    */

    //    solution in one line
    return (
      string1.length == string2.length && (string1 + string1).includes(string2)
    );
  }

  /*
5- Remove duplicate characters in a string.  
Input: “Hellooo!!”
Output: “Helo!” 
*/

  static removeDuplicate(string) {
    if (!string) return "";
    // iteration
    const seen = new Set();
    let cleanedString = "";
    for (let i = 0; i <= string.length - 1; i++) {
      let char = string.charAt(i);
      //   if (cleanedString.indexOf(char) == -1) {
      //     // indexOf makes a loop to find the index O(n)
      //     // instead of the indexOf we use a Set (reduced HashMap) O(1)
      //     cleanedString += char;
      //   }
      //   indexOf O(n) + forLoop O(n) = O(n2)

      if (!seen.has(char)) {
        // more time performant, little more space to use the Set
        // find in Set O(1) + forLoop O(n) = O(n)
        seen.add(char);
        cleanedString += char;
      }
    }
    return cleanedString;
  }
  /*
6- Find the most repeated character in a string.  
Input: “Hellooo!!”
Output: ‘o’ 
*/
  static findTheMostRepeated(string) {
    if (!string) return "";
    const frequencies = new Map(); // if you can't use a HashMap, you can use an array to map indexes to values for all ASCII characters, more space needed. each char has an index value frequiencies[char]
    let i = 0;
    // Time O(n)
    while (i < string.length) {
      let char = string.charAt(i);
      let count = frequencies.get(char) || 0;
      frequencies.set(char, ++count);
      i++;
    }

    // // find the max in the Map,
    // const max = Math.max(...frequencies.values()); // 0(n)
    // for (let [key, value] of frequencies) {
    //   // 0(n)
    //   if (value == max) return key; // here we could cut the entire loop, at the expense of the loop to find the max previously
    // }
    // // this solution goes for 3x O(n)

    // reducing to one loop -> O(n)
    let maxValue = 0;
    let maxKey = "";
    for (let [key, value] of frequencies) {
      if (value > maxValue) {
        maxValue = value;
        maxKey = key;
      }
    }
    return maxKey;
  }
  /*
7- Capitalize the first letter of each word in a sentence. Also, remove any extra spaces between words.  
Input: “trees are beautiful”
Output: “Trees Are Beautiful”
Input: “  trees    are        beautiful  ”
Output: “Trees Are Beautiful”
*/
  static capitalizeFirstLetterOfWord(sentence) {
    if (!sentence || !sentence.trim()) return "";
    const words = sentence
      .toLowerCase()
      .trim()
      .replace(/ +(?= )/g, "") // <--- do something to remove extra space, regex!
      .split(" ");

    // let capitalizedSentence = "";
    // for (let word of words) {
    //   // loop O(n)
    //   for (let i = 0; i < word.length; i++) {
    //     // loop O(n)
    //     capitalizedSentence += i == 0 ? word[i].toUpperCase() : word[i];
    //   }
    //   capitalizedSentence += " ";
    // }
    // return capitalizedSentence.trim();
    // this solution goes to O(n2)

    // reduce to one loop
    for (let i = 0; i < words.length; i++) {
      // override the word in each index, substr to the first character and concat the rest.
      words[i] = words[i].substr(0, 1).toUpperCase() + words[i].substr(1);
    }
    return words.join(" ");
  }

  /*
8- Detect if two strings are anagram of each other. A string is an anagram of another string if it has the exact same characters in any order. 
Input: “abcd”, “adbc”
Output: true
Input: “abcd”, “cadb”
Output: true
Input: “abcd”, “abcd”
Output: true
Input: “abcd”, “abce”
Output: false 
*/
  static isAnagram(str1, str2) {
    // initial checks before any further computation
    if (!str1 || !str2 || str1.length != str2.length) return false;
    // // This method wont care if a letter is repeated in the base.
    // // [AAAB] -> [ABCD] returns true, should be false
    // if (!str1 || !str2) return false;
    // // it has the same lenght.
    // if (str1.length != str2.length) return false;
    // // it has the same characters in any order
    // for (let baseChar of str1) {
    //   // check if each char in the base word is present in the target word
    //   // if -1 means not found
    //   if (str2.indexOf(baseChar) == -1) return false;
    // }

    // another method, turn into arrays, order them and compare if they are equal
    // O(n log n) quick sort method on array.
    const array1 = str1.split("").sort();
    const array2 = str2.split("").sort();
    // O(n) comparison array

    // this method is O(n log n) which is more slow
    return JSON.stringify(array1) === JSON.stringify(array2);
  }

  static areAnagramWithHistogramms(str1, str2) {
    if (!str1 || !str2) return false;
    // another method, using histogramming
    // make a loop with the english alphabet to increment value based on the index of the character.
    const ENGLISH_ALPHABET = 26; //characters
    const frequencies = new Array(ENGLISH_ALPHABET).fill(0);

    const string1 = str1.toLowerCase();
    for (let i = 0; i < string1.length; i++) {
      // each letter has a numeric value
      // if we rest the value of a, you'll get the value within 26 for english alphabet
      frequencies[string1.charAt(i).charCodeAt(0) - "a".charCodeAt(0)]++; // adding units for each encounter
    }

    const string2 = str2.toLowerCase();
    for (let i = 0; i < string2.length; i++) {
      const idx = string2.charAt(i).charCodeAt(0) - "a".charCodeAt(0);
      if (frequencies[idx] == 0) return false;
      frequencies[idx]--; // substracting units
    }

    return true;
  }

  /*
9- Check if a string is palindrome. If we read a palindrome string from left or right, we get the exact same characters.  
Input: “abba”
Output: true
Input: “abcba”
Output: true
Input: “abca”
Output: false
*/
  static isPalindrome(string) {
    // initial check for nulls
    if (!string) return false;

    // one method iteration
    // // to lower case and split are O(n) each
    // const array = string.toLowerCase().split("");
    // // to stringify and reverse are O(n) each
    // return JSON.stringify(array) == JSON.stringify(array.reverse());
    // // this solution is O(n) + O(n) + O(n) + O(n) = O(n)

    // another method is using two pointers.
    // one to the left one to the right
    // compare each char at each index, decrement both side.
    // at the point they meet or pass each other, we compared all characters
    // no iteration is needed, only iterate half of characters O(log n)
    let left = 0;
    let right = string.length - 1;
    while (left < right) {
      if (string[left++] != string[right--]) return false;
      //   left++; we can have it here separate, or increment after inmmediate usage in the string[left++]
      //   right--;
    }
    return true;
  }
}
