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
    it("should reverse a string", () => {
      expect(StringUtils.reverseOrderOfWords("hello how are")).toEqual(
        "are how hello"
      );
      expect(StringUtils.reverseOrderOfWords("Trees are beautiful")).toEqual(
        "beautiful are Trees"
      );
    });
  });
  describe("checkRotationOfAnotherString", () => {
    it("should reverse a string", () => {
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
});
