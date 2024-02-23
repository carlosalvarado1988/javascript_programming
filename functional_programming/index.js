//  input = { tag: “JAVASCRIPT” }
//  output = “(javascript)”

const wrap = (str) => `"(${str})"`;
const toLowerCase = ({ tag }) => tag.toLowerCase();
const input = { tag: "JAVASCRIPT" };
const result = wrap(toLowerCase(input));
console.log(result);
