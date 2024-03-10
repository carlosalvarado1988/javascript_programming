/**
 * @param {string[]} ops - List of operations
 * @return {number} - Sum of scores after performing all operations
 */
var calPoints = function (ops) {
  var record = [];
  var result = null;

  console.log("ops.length", ops.length);
  for (var i = 0; i < ops.length; i++) {
    console.log("i", i);
    console.log("ops[i]", ops[i]);
    var item = ops[i];
    if (Number.isInteger(parseInt(item))) {
      // add item
      record.push(parseInt(item));
    } else if (item === "+") {
      // sum prev 2 scores
      record.push(sumPreviousTwo(record));
    } else if (item === "D") {
      // add twice last item
      record.push(addDoubleLastItem(record));
    } else if (item === "C") {
      // remove last item
      record = record.slice(0, -1);
    }
  }

  for (var i = 0; i < record.length; i++) {
    result += record[i];
  }
  return result;
};

function sumPreviousTwo(list) {
  var sum = 0;
  var lastTwo = list.slice(-2);

  for (var i = 0; i < lastTwo.length; i++) {
    sum += lastTwo[i];
  }
  return sum;
}

function addDoubleLastItem(list) {
  var lastItem = list.slice(-1)[0];
  return lastItem + lastItem;
}

// var ops = readline().split(" ");
// add, add, remove, doubleLast, sum2last
var ops = ["5", "2", "C", "D", "+"];

console.log(calPoints(ops));
