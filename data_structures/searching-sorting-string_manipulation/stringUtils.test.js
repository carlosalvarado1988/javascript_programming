// import { describe } from "@jest/globals"; No need for import, the preset in .babelrc makes sure this is accessible globally
import { StringUtils } from "./stringUtils.js";

describe("StringUtils", () => {
  describe("countVowels", () => {
    it("should count vowels in a string", () => {
      expect(StringUtils.countVowels("hello")).toEqual(2);
      expect(StringUtils.countVowels("hello you")).toEqual(4);
      expect(StringUtils.countVowels()).toEqual(0);
      expect(StringUtils.countVowels("xyz")).toEqual(0);
    });
  });
  describe("reverseString", () => {
    it("should reverse a string", () => {
      expect(StringUtils.reverseString("hello")).toEqual("olleh");
      expect(StringUtils.reverseString("hello how are")).toEqual(
        "era woh olleh"
      );
    });
  });
  describe("reverseOrderOfWords", () => {
    it("should reverse the orders of the words", () => {
      expect(StringUtils.reverseOrderOfWords("hello how are")).toEqual(
        "are how hello"
      );
      expect(StringUtils.reverseOrderOfWords("Trees are beautiful")).toEqual(
        "beautiful are Trees"
      );
    });
  });
  describe("checkRotationOfAnotherString", () => {
    it("should check if a second string is a rotation of the first", () => {
      expect(StringUtils.checkRotationOfAnotherString("ABCD", "DABC")).toEqual(
        true
      ); // (rotate one char to the right)
      expect(StringUtils.checkRotationOfAnotherString("ABCD", "CDAB")).toEqual(
        true
      ); // (rotate two chars to the right)
      expect(StringUtils.checkRotationOfAnotherString("ABCD", "ADBC")).toEqual(
        false
      );
    });
  });
  describe("removeDuplicate", () => {
    it("should remove duplicates in a string", () => {
      expect(StringUtils.removeDuplicate("Hellooo!!")).toEqual("Helo!");
    });
  });
  describe("findTheMostRepeated", () => {
    it("should remove duplicates in a string", () => {
      expect(StringUtils.findTheMostRepeated("Hellooo!!")).toEqual("o");
    });
  });
  describe("capitalizeFirstLetterOfWord", () => {
    it("should capaitalize a letter of a word", () => {
      expect(
        StringUtils.capitalizeFirstLetterOfWord("trees are beautiful")
      ).toEqual("Trees Are Beautiful");
      expect(
        StringUtils.capitalizeFirstLetterOfWord(
          "  trees    are        beautiful  "
        )
      ).toEqual("Trees Are Beautiful");
    });
  });
  describe("isAnagram", () => {
    it("should verify a string has the same characters of the other string", () => {
      expect(StringUtils.isAnagram("abcd", "adbc")).toEqual(true);
      expect(StringUtils.isAnagram("abcd", "cadb")).toEqual(true);
      expect(StringUtils.isAnagram("abcd", "abcd")).toEqual(true);
      expect(StringUtils.isAnagram("abcd", "abce")).toEqual(false);
      expect(StringUtils.isAnagram("abcd", "aaab")).toEqual(false);
      expect(StringUtils.isAnagram("aaab", "abce")).toEqual(false);
    });
  });
  describe("areAnagramWithHistogramms", () => {
    it("should verify a string has the same characters of the other string", () => {
      expect(StringUtils.areAnagramWithHistogramms("abcd", "adbc")).toEqual(
        true
      );
      expect(StringUtils.areAnagramWithHistogramms("abcd", "cadb")).toEqual(
        true
      );
      expect(StringUtils.areAnagramWithHistogramms("abcd", "abcd")).toEqual(
        true
      );
      expect(StringUtils.areAnagramWithHistogramms("abcd", "abce")).toEqual(
        false
      );
      expect(StringUtils.areAnagramWithHistogramms("abcd", "aaab")).toEqual(
        false
      );
      expect(StringUtils.areAnagramWithHistogramms("aaab", "abce")).toEqual(
        false
      );
    });
  });
  describe("isPalindrome", () => {
    it("should read the same from left to right and viceversa", () => {
      expect(StringUtils.isPalindrome("abba")).toEqual(true);
      expect(StringUtils.isPalindrome("abcba")).toEqual(true);
      expect(StringUtils.isPalindrome("abca")).toEqual(false);
    });
  });
});
