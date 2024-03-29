import { BinaryTree } from "../../data_structures/non-linear/binary_trees/binaryTree";

/*
There are some spherical balloons taped onto a flat wall that represents the XY-plane. The balloons are represented as a 2D integer array points where points[i] = [xstart, xend] denotes a balloon whose horizontal diameter stretches between xstart and xend. You do not know the exact y-coordinates of the balloons.

Arrows can be shot up directly vertically (in the positive y-direction) from different points along the x-axis. A balloon with xstart and xend is burst by an arrow shot at x if xstart <= x <= xend. There is no limit to the number of arrows that can be shot. A shot arrow keeps traveling up infinitely, bursting any balloons in its path.

Given the array points, return the minimum number of arrows that must be shot to burst all balloons.
*/

/*
    SOLUTION:
    To solve this problem, we need to find the minimum number of arrows required to burst all balloons. We can approach this problem using a greedy algorithm. The idea is to sort the balloons based on their end points (xend), then iterate through them, keeping track of the maximum end point encountered so far. Whenever a balloon's start point (xstart) is greater than the maximum end point encountered so far, it means a new arrow needs to be shot to burst the previous balloons and the current balloon.

    Here's the implementation of the algorithm in JavaScript:
*/
export function findMinArrowShots(points) {
  // Edge case handling
  if (points.length === 0) return 0;

  // Sort the balloons based on their end points
  points.sort((a, b) => a[1] - b[1]);

  let arrows = 1;
  let prevEnd = points[0][1];

  // Iterate through the balloons
  for (let i = 1; i < points.length; i++) {
    const [xstart, xend] = points[i];

    // If the current balloon starts after the previous one ends, we need a new arrow
    if (xstart > prevEnd) {
      arrows++;
      prevEnd = xend; // Update the maximum end point encountered so far
    }
  }

  return arrows;
}

// // ts
// function findMinArrowShots(points: number[][]): number {
//   // Edge case handling
//   if (points.length === 0) return 0;

//   // Sort the balloons based on their end points
//   points.sort((a, b) => a[1] - b[1]);

//   let arrows = 1;
//   let prevEnd = points[0][1];

//   // Iterate through the balloons
//   for (let i = 1; i < points.length; i++) {
//     const [xstart, xend] = points[i];

//     // If the current balloon starts after the previous one ends, we need a new arrow
//     if (xstart > prevEnd) {
//       arrows++;
//       prevEnd = xend; // Update the maximum end point encountered so far
//     }
//   }

//   return arrows;
// }

// *********************************************************************
// *********************************************************************
// *********************************************************************

/*
1609. Even Odd Tree
A binary tree is named Even-Odd if it meets the following conditions:

The root of the binary tree is at level index 0, its children are at level index 1, their children are at level index 2, etc.
For every even-indexed level, all nodes at the level have odd integer values in strictly increasing order (from left to right).
For every odd-indexed level, all nodes at the level have even integer values in strictly decreasing order (from left to right).
Given the root of a binary tree, return true if the binary tree is Even-Odd, otherwise return false.

Input: root = [1,10,4,3,null,7,9,12,8,6,null,null,2]
Output: true
Explanation: The node values on each level are:
Level 0: [1]
Level 1: [10,4]
Level 2: [3,7,9]
Level 3: [12,8,6,2]
Since levels 0 and 2 are all odd and increasing and levels 1 and 3 are all even and decreasing, the tree is Even-Odd.

Input: root = [5,4,2,3,3,7]
Output: false
Explanation: The node values on each level are:
Level 0: [5]
Level 1: [4,2]
Level 2: [3,3,7]
Node values in level 2 must be in strictly increasing order, so the tree is not Even-Odd.

Input: root = [5,9,1,3,5,7]
Output: false
Explanation: Node values in the level 1 should be even integers.


Constraints:

The number of nodes in the tree is in the range [1, 105].
1 <= Node.val <= 106
*/

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {boolean}
 */

function buildTree(arr) {
  const tree = new BinaryTree();
  for (let item of arr) {
    tree.insert(item);
  }
  return tree;
}

// export function isEvenOddTree(array) {
//   if (!array) return false;
//   const root = buildTree(array);
//   if (!root) return true;

//   let queue = [root];
//   let level = 0;

//   while (queue.length > 0) {
//     const size = queue.length;
//     let prev = level % 2 === 0 ? -1 : Infinity;

//     for (let i = 0; i < size; i++) {
//       const node = queue.shift();

//       // check if the node fulfills the conditions
//       if (
//         (level % 2 === 0 && (node.val % 2 !== 1 || node.val <= prev)) ||
//         (level % 2 === 1 && (node.val % 2 !== 0 || node.val >= prev))
//       ) {
//         return false;
//       }

//       // update previous value for the next iteration
//       prev = node.val;

//       if (node.left) queue.push(node.left);
//       if (node.right) queue.push(node.right);
//     }

//     level++;
//   }

//   return true;
// }

export function turingTest2(a, b) {
  return 1;
}
