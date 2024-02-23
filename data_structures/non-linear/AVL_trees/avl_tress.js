/* 
Add the following set of numbers to an AVL tree. 
For each set, start with an empty tree.
Draw the tree at each step and show the type of 
rotations required to re-balance the tree. 

Solutions are on the next page.  
Set 1: (1, 2, 3, 4, 5) 
Set 2: (5, 10, 3, 12, 15, 14) 
Set 3: (12, 3, 9, 4, 6, 2) 
You can use the following tool to visualize an AVL tree: 
https://www.cs.usfca.edu/~galles/visualization/AVLtree.html


AVL Class from scratch

*/

class AVLNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
    this.height = 0;
  }
}

export class AVLTree {
  constructor() {
    this.root = null;
  }

  //using recursion
  insert(value) {
    const node = new AVLNode(value);
    if (!this.root) {
      this.root = node;
      return;
    }

    const recursiveHelper = (value, root) => {
      if (value < root.value) {
        if (!root.left) {
          root.left = node;
        } else {
          recursiveHelper(value, root.left);
        }
      } else {
        if (!root.right) {
          root.right = node;
        } else {
          recursiveHelper(value, root.right);
        }
      }
    };

    recursiveHelper(value, this.root);
  }

  //using recursion way 2
  insert2(value) {
    // func returns a node
    const recursiveInsert = (value, root) => {
      // when leaf null found
      if (!root) return new AVLNode(value);

      if (value < root.value) {
        // appending to left leaf
        root.left = recursiveInsert(value, root.left);
      } else {
        // appending to right leaf
        root.right = recursiveInsert(value, root.right);
      }

      this.#setHeight(root);

      //   returning the root node back in every iteration to the chain
      root = this.#balance(root, value);

      return root;
    };

    // this method is appending and replacing the hole root
    console.log(`${value} was inserted`);
    this.root = recursiveInsert(value, this.root);
  }

  #balance(root) {
    /*
        About Rotations on a Detected Right heavy tree.
        you find the balance factor, if the unbalance in the root is -1 (balance factor right heavy)
        here we know we are dealing with this shape:
        10 - root.
          20 - balanceFactor(root.right)[0-30] = (-1) (which mean Right Heavy on it)
            30
        here we need to do a LeftRotate
    
        another case, if the unbalance of the root is 1 (balance factor left heavy)
        here we know we are dealing with this shape:
        10 - root.
          30 - balanceFactor(root.right)[20-0] = (1) (which mean Left Heavy on it)
        20  
        here we need to do a RightRotate, followed by a LeftRotate.
    
      */

    // making rotation and shifting root reference,
    // should be better with immutableJS
    if (this.#isLeftHeavy(root)) {
      console.log(`${root.value} is Left heavy`);
      if (this.#getBalanceFactor(root.left) < 0) {
        console.log(`should perform LeftRotate on ${root.left.value}`);
        root.left = this.#rotateLeft(root.left);
      }
      // here always do left rotate on right heavy,
      // when balance is < 0, is a follow up
      // when balance is > 0, is the only operation on root value
      console.log(`should perform RightRotate on ${root.value}`);
      return this.#rotateRight(root);
    } else if (this.#isRightHeavy(root)) {
      console.log(`${root.value} is Right heavy`);
      if (this.#getBalanceFactor(root.right) > 0) {
        console.log(`should perform RightRotate on ${root.right.value}`);
        root.right = this.#rotateRight(root.right);
      }
      // here always do left rotate on right heavy,
      // when balance is > 0, is a follow up
      // when balance is < 0, is the only operation on root value
      console.log(`should perform LeftRotate on ${root.value}`);
      return this.#rotateLeft(root);
    } else {
      console.log(`${root.value} is balanced`);
      return root;
    }
  }

  #getBalanceFactor(node) {
    // BalanceFactor = height(L) - height(R
    return !node ? 0 : this.#getHeight(node.left) - this.#getHeight(node.right);
  }

  #isLeftHeavy(node) {
    // > 1 ==> Left heavy
    return this.#getBalanceFactor(node) > 1;
  }

  #isRightHeavy(node) {
    // < -1 ==> Right heavy
    return this.#getBalanceFactor(node) < -1;
  }

  getNodesAtDistance(distance) {
    const helper = (node, distance, carriedList) => {
      if (!node) return;
      if (distance === 0) {
        carriedList.push(node.value);
        return;
      }

      helper(node.left, distance - 1, carriedList);
      helper(node.right, distance - 1, carriedList);
    };
    const list = [];
    helper(this.root, distance, list);
    return list;
  }

  #getHeight(node) {
    return !node ? -1 : node.height;
  }

  #setHeight(node) {
    // assigning height to the level
    node.height =
      Math.max(this.#getHeight(node.left), this.#getHeight(node.right)) + 1;
  }

  #rotateLeft(rootNode) {
    console.log(`perform rotateLeft on ${rootNode.value}`);
    // newRoot = root.right (make 20 the new root)
    // root.right = newRoot.left (any left child of the new root will pass down to be right child of the old root)
    // newRoot.left = root ( pass 10 to the left child of 20 )
    // see the README for reference
    const newRoot = rootNode.right;
    rootNode.right = newRoot.left;
    newRoot.left = rootNode;

    this.#setHeight(rootNode);
    this.#setHeight(newRoot);

    return newRoot;
  }

  #rotateRight(rootNode) {
    console.log(`perform rotateRight on ${rootNode.value}`);
    // newRoot = [oldRoot.right].left;
    // newRoot.right = oldRoot;
    // rootNode.left = null;
    // return newRoot;
    const newRoot = rootNode.left;
    rootNode.left = null;
    newRoot.right = rootNode;

    this.#setHeight(rootNode);
    this.#setHeight(newRoot);

    return newRoot;
  }
}

const balancedCretedavlTree = new AVLTree();
console.log("balancedCretedavlTree");
balancedCretedavlTree.insert2(3);
balancedCretedavlTree.insert2(1);
balancedCretedavlTree.insert2(5);
balancedCretedavlTree.insert2(2);

balancedCretedavlTree.insert2(7);

console.log(
  "getNodesAtDistance(0)",
  balancedCretedavlTree.getNodesAtDistance(0)
);
console.log(
  "getNodesAtDistance(1)",
  balancedCretedavlTree.getNodesAtDistance(1)
);
console.log(
  "getNodesAtDistance(2)",
  balancedCretedavlTree.getNodesAtDistance(2)
);

console.log("\nrightHeavy1");
const rightHeavy1 = new AVLTree();
rightHeavy1.insert2(10);
rightHeavy1.insert2(30);
rightHeavy1.insert2(20);
console.log("\nrotations performed, check AVL, Inserted 10, 30, 20");
console.log("getNodesAtDistance(0)", rightHeavy1.getNodesAtDistance(0));
console.log("getNodesAtDistance(1)", rightHeavy1.getNodesAtDistance(1));
console.log("getNodesAtDistance(2)", rightHeavy1.getNodesAtDistance(2));

console.log("\nrightHeavy2");
const rightHeavy2 = new AVLTree();
rightHeavy2.insert2(10);
rightHeavy2.insert2(20);
rightHeavy2.insert2(30);
console.log("\nrotations performed, check AVL, Inserted 10, 20, 30");
console.log("getNodesAtDistance(0)", rightHeavy2.getNodesAtDistance(0));
console.log("getNodesAtDistance(1)", rightHeavy2.getNodesAtDistance(1));
console.log("getNodesAtDistance(2)", rightHeavy2.getNodesAtDistance(2));

console.log("\nleftHeavy");
const leftHeavy = new AVLTree();
leftHeavy.insert2(30);
leftHeavy.insert2(20);
leftHeavy.insert2(10);
console.log("\nrotations performed, check AVL, Inserted 30, 20, 10");
console.log("getNodesAtDistance(0)", leftHeavy.getNodesAtDistance(0));
console.log("getNodesAtDistance(1)", leftHeavy.getNodesAtDistance(1));
console.log("getNodesAtDistance(2)", leftHeavy.getNodesAtDistance(2));

console.log("\nleftHeavy2");
const leftHeavy2 = new AVLTree();
leftHeavy2.insert2(30);
leftHeavy2.insert2(10);
leftHeavy2.insert2(20);
console.log("\nrotations performed, check AVL, Inserted 30, 10, 20");
console.log("getNodesAtDistance(0)", leftHeavy2.getNodesAtDistance(0));
console.log("getNodesAtDistance(1)", leftHeavy2.getNodesAtDistance(1));
console.log("getNodesAtDistance(2)", leftHeavy2.getNodesAtDistance(2));
