/**
 * @param {string[]} ops - List of operations
 * @return {number} - Sum of scores after performing all operations
 */

export class Baseball {
  // constructor() no need for constructor here
  #trackingScore = [];

  calculatePoints(options) {
    for (let item of options) {
      if (this.#isInteger(item)) {
        this.#addItem(item);
      } else if (this.#isC(item)) {
        this.#removeLastItem();
      } else if (this.#isD(item)) {
        this.#addLastItemTwice();
      } else if (this.#isPlus(item)) {
        this.#sumTwoPrevScores();
      }
    }
    return this.#getScoreFromTrackingScore();
  }
  // matching conditions
  // determine each option
  // integers are added
  // C removes last item
  // D add last item twice
  // + sum two prev scores
  #isInteger(item) {
    return Number.isInteger(parseFloat(item));
  }

  #isC(item) {
    return typeof item == "string" && item === "C";
  }
  #isD(item) {
    return typeof item == "string" && item === "D";
  }
  #isPlus(item) {
    return typeof item == "string" && item === "+";
  }

  // perform effect operations

  #addItem(item) {
    this.#trackingScore.push(parseInt(item));
  }

  #removeLastItem() {
    this.#trackingScore = this.#trackingScore.slice(0, -1);
  }
  #addLastItemTwice() {
    const lastItem = this.#trackingScore.slice(-1)[0];
    this.#trackingScore.push(lastItem + lastItem);
  }
  #sumTwoPrevScores() {
    let sum = 0;
    const lastTwo = this.#trackingScore.slice(-2);
    for (var i = 0; i < lastTwo.length; i++) {
      sum += lastTwo[i];
    }
    this.#trackingScore.push(sum);
  }

  #getScoreFromTrackingScore() {
    let sum = 0;
    for (let score of this.#trackingScore) {
      sum += score;
    }
    return sum;
  }
}

// var calPoints = function (ops) {
//   var record = [];
//   var result = null;

//   console.log("ops.length", ops.length);
//   for (var i = 0; i < ops.length; i++) {
//     console.log("i", i);
//     console.log("ops[i]", ops[i]);
//     var item = ops[i];
//     if (Number.isInteger(parseInt(item))) {
//       // add item
//       record.push(parseInt(item));
//     } else if (item === "+") {
//       // sum prev 2 scores
//       record.push(sumPreviousTwo(record));
//     } else if (item === "D") {
//       // add twice last item
//       record.push(addDoubleLastItem(record));
//     } else if (item === "C") {
//       // remove last item
//       record = record.slice(0, -1);
//     }
//   }

//   for (var i = 0; i < record.length; i++) {
//     result += record[i];
//   }
//   return result;
// };

// function sumPreviousTwo(list) {
//   var sum = 0;
//   var lastTwo = list.slice(-2);

//   for (var i = 0; i < lastTwo.length; i++) {
//     sum += lastTwo[i];
//   }
//   return sum;
// }

// function addDoubleLastItem(list) {
//   var lastItem = list.slice(-1)[0];
//   return lastItem + lastItem;
// }

// // var ops = readline().split(" ");
// // add, add, remove, doubleLast, sum2last
// var ops = ["5", "2", "C", "D", "+"];

// console.log(calPoints(ops)); // 30
