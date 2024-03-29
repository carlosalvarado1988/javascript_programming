import {
  bagOfTokensScore,
  bagOfTokensScoreMutatingParamArray,
  maxScoreChatGPT,
  eliminateMaximum,
} from "../medium";

describe("Medium", () => {
  it("bagOfTokensScore", () => {
    expect(bagOfTokensScore([100], 50)).toBe(0);
    expect(bagOfTokensScore([200, 100], 150)).toBe(1);
    expect(bagOfTokensScore([100, 200, 300, 400], 200)).toBe(2);
  });
  it("bagOfTokensScoreMutatingParamArray", () => {
    expect(bagOfTokensScoreMutatingParamArray([100], 50)).toBe(0);
    expect(bagOfTokensScoreMutatingParamArray([200, 100], 150)).toBe(1);
    expect(bagOfTokensScoreMutatingParamArray([100, 200, 300, 400], 200)).toBe(
      2
    );
  });
  it("maxScoreChatGPT", () => {
    expect(maxScoreChatGPT([100], 50)).toBe(0);
    expect(maxScoreChatGPT([200, 100], 150)).toBe(1);
    expect(maxScoreChatGPT([100, 200, 300, 400], 200)).toBe(2);
  });

  it("eliminateMaximum", () => {
    expect(eliminateMaximum([1, 3, 4], [1, 1, 1])).toBe(3);
    expect(eliminateMaximum([1, 1, 2, 3], [1, 1, 1, 1])).toBe(1);
    expect(eliminateMaximum([3, 2, 4], [5, 3, 2])).toBe(1);
  });
});
