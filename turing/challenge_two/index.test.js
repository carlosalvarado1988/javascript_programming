import { numberGenerator, rearrangeString3 } from "./index";

describe("Challenge two", () => {
  it.skip("numberGenerator", () => {
    expect(numberGenerator("0123456789", "210")).toBe(4);
    expect(numberGenerator("8459761203", "5439")).toBe(17);
  });
  it("rearrangeString", () => {
    expect(rearrangeString3("z3b1a2")).toBe("1a2b3z");
    expect(rearrangeString3("q56")).toBe("5q6");
    expect(rearrangeString3("q56asb")).toBe("");
  });
});
