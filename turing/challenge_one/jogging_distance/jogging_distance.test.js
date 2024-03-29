import { JoggingDistance, distance } from "./jogging_distance.js";

//   REFERECE; Those is (1) are stored in the array.
//   Those in the corners, are the x, y resting point.
//  0 -(1)-> 1
//  |        |
// (4)      (2)
//  |        |
//  3 <-(3)-- 2

describe("JoggingDistance.shortestDistance module - using array", () => {
  test("shortestDistance([1, 2, 3, 4], starting, destination), when destination is grater that beginning", () => {
    expect(JoggingDistance.shortestDistance([1, 2, 3, 4], 0, 1)).toBe(1);
    expect(JoggingDistance.shortestDistance([1, 2, 3, 4], 0, 2)).toBe(3);
    expect(JoggingDistance.shortestDistance([1, 2, 3, 4], 0, 3)).toBe(4);
    expect(JoggingDistance.shortestDistance([2, 3, 5, 7], 0, 2)).toBe(5);
    expect(JoggingDistance.shortestDistance([1, 2, 3, 4], 1, 2)).toBe(2);
    expect(JoggingDistance.shortestDistance([1, 2, 3, 4], 1, 3)).toBe(5);
    expect(JoggingDistance.shortestDistance([1, 2, 3, 4], 2, 3)).toBe(3);
  });

  test("shortestDistance([1, 2, 3, 4], starting, destination), when destination is lower than start", () => {
    expect(JoggingDistance.shortestDistance([1, 2, 3, 4], 3, 0)).toBe(4);
    expect(JoggingDistance.shortestDistance([1, 2, 3, 4], 1, 2)).toBe(2);
    expect(JoggingDistance.shortestDistance([1, 2, 3, 4], 3, 2)).toBe(3);
    expect(JoggingDistance.shortestDistance([1, 2, 3, 4], 2, 0)).toBe(3);
    expect(JoggingDistance.shortestDistance([1, 2, 3, 4], 3, 1)).toBe(5);
  });
});

describe("JoggingDistance.shortestDistance2 module - using array", () => {
  test("shortestDistance2([1, 2, 3, 4], starting, destination), when destination is grater that beginning", () => {
    expect(JoggingDistance.shortestDistance2([1, 2, 3, 4], 0, 1)).toBe(1);
    expect(JoggingDistance.shortestDistance2([1, 2, 3, 4], 0, 2)).toBe(3);
    expect(JoggingDistance.shortestDistance2([1, 2, 3, 4], 0, 3)).toBe(4);
    expect(JoggingDistance.shortestDistance2([2, 3, 5, 7], 0, 2)).toBe(5);
    expect(JoggingDistance.shortestDistance2([1, 2, 3, 4], 1, 2)).toBe(2);
    expect(JoggingDistance.shortestDistance2([1, 2, 3, 4], 1, 3)).toBe(5);
    expect(JoggingDistance.shortestDistance2([1, 2, 3, 4], 2, 3)).toBe(3);
  });

  test("shortestDistance2([1, 2, 3, 4], starting, destination), when destination is lower than start", () => {
    expect(JoggingDistance.shortestDistance2([1, 2, 3, 4], 3, 0)).toBe(4);
    expect(JoggingDistance.shortestDistance2([1, 2, 3, 4], 1, 2)).toBe(2);
    expect(JoggingDistance.shortestDistance2([1, 2, 3, 4], 3, 2)).toBe(3);
    expect(JoggingDistance.shortestDistance2([1, 2, 3, 4], 2, 0)).toBe(3);
    expect(JoggingDistance.shortestDistance2([1, 2, 3, 4], 3, 1)).toBe(5);
  });
});

describe("distance module - using Map objects", () => {
  test("distnace([1, 2, 3, 4], starting, destination), when destination is grater that beginning", () => {
    expect(distance([1, 2, 3, 4], 0, 1)).toBe(1);
    expect(distance([1, 2, 3, 4], 0, 2)).toBe(3);
    expect(distance([1, 2, 3, 4], 0, 3)).toBe(4);
    expect(distance([2, 3, 5, 7], 0, 2)).toBe(5);
    expect(distance([1, 2, 3, 4], 1, 2)).toBe(2);
    expect(distance([1, 2, 3, 4], 1, 3)).toBe(5);
    expect(distance([1, 2, 3, 4], 2, 3)).toBe(3);
  });

  test("distnace([1, 2, 3, 4], starting, destination), when destination is lower than start", () => {
    expect(distance([1, 2, 3, 4], 3, 0)).toBe(4);
    expect(distance([1, 2, 3, 4], 1, 2)).toBe(2);
    expect(distance([1, 2, 3, 4], 3, 2)).toBe(3);
    expect(distance([1, 2, 3, 4], 2, 0)).toBe(3);
    expect(distance([1, 2, 3, 4], 3, 1)).toBe(5);
  });
});
