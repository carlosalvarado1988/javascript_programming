import { findMinArrowShots, isEvenOddTree } from "../advanced";

describe("Advanced challenges", () => {
  it("findMinArrowShots", () => {
    expect(
      findMinArrowShots([
        [10, 16],
        [2, 8],
        [1, 6],
        [7, 12],
      ])
    ).toBe(2);
    expect(
      findMinArrowShots([
        [1, 2],
        [3, 4],
        [5, 6],
        [7, 8],
      ])
    ).toBe(4);
    expect(
      findMinArrowShots([
        [1, 2],
        [2, 3],
        [3, 4],
        [4, 5],
      ])
    ).toBe(2);
  });

  it.skip("isEvenOddTree", () => {
    // skip it because i need to implement a func to turn the array
    // as a tree, taking nulls as their position
    //   level 1: [1]
    //   level 2: [10, 4]
    //   level 3: [3, null, 7, 9]
    //   level 4: [12, 8, 6, null, null, 2]
    expect(
      isEvenOddTree([1, 10, 4, 3, null, 7, 9, 12, 8, 6, null, null, 2])
    ).toBe(true);
    expect(isEvenOddTree([5, 4, 2, 3, 3, 7])).toBe(false);
    expect(isEvenOddTree([5, 9, 1, 3, 5, 7])).toBe(false);
  });
});
