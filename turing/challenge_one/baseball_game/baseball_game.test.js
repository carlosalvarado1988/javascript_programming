import { Baseball } from "./baseball_game";

// var ops = readline().split(" ");
// add, add, remove, doubleLast, sum2last
// var ops = ["5", "2", "C", "D", "+"];
// console.log(calPoints(ops)); // 30

describe("Baseball Game", () => {
  it("calPoints", () => {
    const game = new Baseball();
    expect(game.calculatePoints(["5", "2", "C", "D", "+"])).toBe(30);
  });
});
