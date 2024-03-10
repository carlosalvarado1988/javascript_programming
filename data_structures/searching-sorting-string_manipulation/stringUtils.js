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
  /*
6- Find the most repeated character in a string.  Input: “Hellooo!!”
Output: ‘o’ 
*/
  /*
7- Capitalize the first letter of each word in a sentence. Also, remove any extra spaces between words.  Input: “trees are beautiful”
Output: “Trees Are Beautiful”
Input: “  trees    are        beautiful  ”Output: “Trees Are Beautiful”
*/
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
  /*
9- Check if a string is palindrome. If we read a palindrome string from left or right, we get the exact same characters.  
Input: “abba”
Output: true
Input: “abcba”
Output: true
Input: “abca”
Output: false
*/
}
