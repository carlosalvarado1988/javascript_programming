// k array of distances between points.
// x = starting resting point
// y = destination resting point

//  0 -(1)-> 1
//  |        |
// (4)      (2)
//  |        |
//  3 <-(3)-- 2

// STARTING ON 0.
// (distances = [1,2,3,4], start = 0, destination 1) result = 1. (clockwise = 1, counterClockWise = 9)
// (distances = [1,2,3,4], start = 0, destination 2) result = 3. (clockwise = 3, counterClockWise = 7)

export class JoggingDistance {
  //
  static shortestDis(distances, start, finish) {
    // Using a map to match distances.
    const distancesMap = new Map();
    distances.map((distance, spotIndex) => {
      distancesMap.set(spotIndex, distance);
      // 0 => 1
      // 1 => 2
      // 2 => 3
      // 3 => 4
    });

    if (finish < start) {
      // swap
      let temp = start;
      start = finish;
      finish = temp;
    }

    let clockWise = 0;
    for (let i = start; i < finish; i++) {
      clockWise += distancesMap.get(i);
    }

    let counterClockWise = 0;
    for (let i = finish; i < distances.length; i++)
      counterClockWise += distancesMap.get(i);
    for (let i = 0; i < start; i++) counterClockWise += distancesMap.get(i);

    return counterClockWise < clockWise ? counterClockWise : clockWise;
  }

  // what i did right after data_structures with Mosh
  static shortestDistance(k, start, finish) {
    // Using Iteration
    if (finish < start) {
      let temp = start;
      start = finish;
      finish = temp;
    }

    let clockWise = 0;
    for (let i = start; i < finish; i++) clockWise += k[i];

    let counterWise = 0;
    for (let i = finish; i < k.length; i++) counterWise += k[i];
    for (let i = 0; i < start; i++) counterWise += k[i];

    // compare which is less
    // return clockWise < counterWise ? clockWise : counterWise;
    return Math.min(counterWise, clockWise);
  }

  // what i did in the test
  static shortestDistance2(k, x, y) {
    // this is circular, so lets define the starting point (left) and destination point (right) to comply with looping the array.
    // looping from starting to destination is the clockWise measure
    // looping from destination to end + 0 to starting point is the counterClockWise measure.
    const startPoint = x > y ? y : x;
    const destinationPoint = x > y ? x : y;
    const length = k.length;

    // SECTION FOR clockWise
    // looping to the right in the array.
    let clockWise = 0;

    // ONE CLARIFICATION ABOUT THIS OFFSET APPROACH.
    // 0 -> 1
    // the position 0 is actualy getting the value to get postion 1.
    // 1 -> 1 does not run, thats why it works, it only reads 1.
    // all can be off-by-one to and conceptually match the position to a value,
    // that only matches if the for-loop limit is <= .
    // for instace:
    // const startPoint = (x > y ? y : x) -1;
    // const destinationPoint = (x > y ? x : y) -1;
    // const length = k.length - 1;
    // for (i = startPoint; i <= destinationPoint; i++) {

    for (let i = startPoint; i < destinationPoint; i++) {
      clockWise += k[i];
    }

    // SECTION FOR let counterClockWise = 0;
    let counterClockWise = 0;
    // looping from destination to end
    for (let i = destinationPoint; i < length; i++) {
      counterClockWise += k[i];
    }
    // looping from 0 to starting point
    if (startPoint >= 0) {
      for (let i = 0; i < startPoint; i++) {
        counterClockWise += k[i];
      }
    }

    return clockWise < counterClockWise ? clockWise : counterClockWise;
  }
}

// my error was  for (i = startPoint; i <= destinationPoint; i++) { i forgot to declar LET!!!!

// module.exports = function shortestDistance(k, x, y) {
//   // this is circular, so lets define the starting point (left) and destination point (right) to comply with looping the array.
//   // looping from starting to destination is the clockWise measure
//   // looping from destination to end + 0 to starting point is the counterClockWise measure.
//   const startPoint = x > y ? y : x;
//   const destinationPoint = x > y ? x : y;
//   const length = k.length;

//   // SECTION FOR clockWise
//   // looping to the right in the array.
//   let clockWise = 0;

//   // ONE CLARIFICATION ABOUT THIS OFFSET APPROACH.
//   // 0 -> 1
//   // the position 0 is actualy getting the value to get postion 1.
//   // 1 -> 1 does not run, thats why it works, it only reads 1.
//   // all can be off-by-one to and conceptually match the position to a value,
//   // that only matches if the for-loop limit is <= .
//   // for instace:
//   // const startPoint = (x > y ? y : x) -1;
//   // const destinationPoint = (x > y ? x : y) -1;
//   // const length = k.length - 1;
//   // for (i = startPoint; i <= destinationPoint; i++) {

//   for (i = startPoint; i < destinationPoint; i++) {
//     clockWise += k[i];
//   }

//   // SECTION FOR let counterClockWise = 0;
//   let counterClockWise = 0;
//   // looping from destination to end
//   for (i = destinationPoint; i < length; i++) {
//     counterClockWise += k[i];
//   }
//   // looping from 0 to starting point
//   if (startPoint >= 0) {
//     for (i = 0; i < startPoint; i++) {
//       counterClockWise += k[i];
//     }
//   }

//   return clockWise < counterClockWise ? clockWise : counterClockWise;
// };
