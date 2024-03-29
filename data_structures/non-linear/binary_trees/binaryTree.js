/*

Binary Search Trees   
Add the following numbers to a binary search tree. 
Remember, in a binary search tree:  
left < parent  
right > parent  

/.. left < node < right
[10, 5, 15, 6, 1, 8, 12, 18, 17]

Solution: next page 
You can also use the following tool to see how a binary 
search tree evolves as you add new items:  
https://visualgo.net/en/bst


Tree (root)
node (value, leftChild, rightChild)
insert(value)
find(value): boolean


BINARY TREE: is the strucutre, nodes can be not organized
BINARY SEARCH TREE: is a binary tree structure, where left < root < right.
    
TRAVERSAL

- BREADTH FIRST -- LEVEL ORDER
      Visit all the nodes at the same level before moving to the next level
- DEPTH FIRST
      Pre-order: ROOT, Left Right
      In-order: Left, ROOT, Right
      Post-order: Left, Right, ROOT
*/

class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

export class BinaryTree {
  constructor() {
    this.root = null;
  }

  find(value) {
    if (!this.root) return false;

    let current = this.root;

    let found = false;
    while (current && !found) {
      if (value < current.value) {
        current = current.left;
      } else if (value > current.value) {
        current = current.right;
      } else {
        found = current;
      }
    }

    if (!found) return undefined;
    return found;
  }

  insert(value) {
    const node = new Node(value);
    if (!this.root) {
      this.root = node;
      return;
    }

    var current = this.root;

    while (true) {
      if (value < current.value) {
        // if no child in left, this is going to be its root
        if (!current.left) {
          // set node as left child of current
          current.left = node;
          break;
        }
        // set that as the new root to iterate
        current = current.left;
      } else {
        if (!current.right) {
          // set node as right child of current
          current.right = node;
          break;
        }
        // set that as the new root to iterate
        current = current.right;
      }
    }
  }

  // private
  #traversePreOrder(currentRoot) {
    if (!currentRoot) return;

    console.log(currentRoot.value);
    this.#traversePreOrder(currentRoot.left);
    this.#traversePreOrder(currentRoot.right);
  }

  #height(currentRoot) {
    if (!currentRoot) return -1;
    // base condition, when we get a leaf node
    if (this.#isLeaf(currentRoot)) return 0;

    // formula: 1 + max(height(left), height(right))
    return (
      1 +
      Math.max(this.#height(currentRoot.left), this.#height(currentRoot.right))
    );
  }

  #isLeaf(node) {
    return node.left == null && node.right == null;
  }

  traversePreOrder() {
    this.#traversePreOrder(this.root);
  }

  height() {
    return this.#height(this.root);
  }

  // O(log n) - performance is O(log n), in each iteration is discarding about half of the nodes because its already ordered
  minOnBST() {
    // TO USE this implementation, the BT needs to be ordered, all left are minor
    // no need of recursion, only traverse towards the left side until the end

    if (!this.root) return -1;

    let current = this.root;
    let last = current;

    while (current) {
      last = current;
      current = current.left;
    }
    return last.value;
  }

  // O(n) - performance is O(n), need to traverse the entire tree
  min() {
    return this.#min(this.root);
  }

  #min(currentNode) {
    if (this.#isLeaf(currentNode)) return currentNode.value;
    const left = this.#min(currentNode.left);
    const right = this.#min(currentNode.right);

    return Math.min(Math.min(left, right), currentNode.value);
  }

  equal(otherTree) {
    if (!otherTree) return false;
    return this.#equalsWithRecursion(this.root, otherTree.root);
  }
  #equalsWithRecursion(firstTree, secondTree) {
    if (!firstTree && !secondTree) {
      return true;
    }

    if (firstTree && secondTree) {
      return (
        firstTree.value == secondTree.value &&
        this.#equalsWithRecursion(firstTree.left, secondTree.left) &&
        this.#equalsWithRecursion(firstTree.right, secondTree.right)
      );
    }

    // maybe one is null and the other has data
    return false;
  }

  isThisValidBST() {
    /* 
                         parent.root
                       -----(8)-------
                      /               \
                current.root      current.root
                   (6)                 (10)
                  /   \               /    \
              left    right         left   right
               (4)      (7)          (9)    (12)
    */
    // for every level on the left node check.
    // - ranage: (-infinity, current.root)
    // - ranage: (current.root, parent.root)
    // for every level on the right node check.
    // - ranage: (current.root, +infinity)
    // - ranage: (parent.root, current.root)
    return this.isValidBST(
      this.root,
      Number.MIN_SAFE_INTEGER,
      Number.MAX_SAFE_INTEGER
    );
  }

  isValidBST(root) {
    return this.#checkIsBST(
      root,
      Number.MIN_SAFE_INTEGER,
      Number.MAX_SAFE_INTEGER
    );
  }

  #checkIsBST(root, min, max) {
    if (!root) return true; // we reach the deepest leaf, its true so far.
    if (root.value <= min || root.value >= max) return false; // this line invalidates in any level.

    // Recursive comparisons
    // for every level on the left node check.
    // - range check: (-infinity[Number.MIN_SAFE_INTEGER], current.root) (check this)

    // for every level on the right node check.
    // - range check: (current.root, +infinity[Number.MAX_SAFE_INTEGER]) (check this)

    return (
      this.#checkIsBST(root.left, min, root.value) &&
      this.#checkIsBST(root.righ, root.value, max)
    );
  }

  swapRootLevel() {
    const temp = this.root.left;
    this.root.left = this.root.right;
    this.root.right = temp;
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

  levelOrderTraversal() {
    // traverse height, longers leaf to root

    for (let i = 0; i <= this.height(); i++) {
      for (let value of this.getNodesAtDistance(i)) {
        console.log(value);
      }
    }
  }
}

// const tree = new BinaryTree();
// tree.insert(7);
// tree.insert(4);
// tree.insert(9);
// tree.insert(1);
// tree.insert(6);
// tree.insert(8);
// tree.insert(10);

// console.log("\ntree.find()");
// console.log("tree.find(19):", tree.find(19));
// console.log("tree.find(10):", tree.find(10));

// console.log("\ntree.traversePreOrder()");
// tree.traversePreOrder();

// console.log("\ntree.height()", tree.height());
// console.log("\ntree.min()", tree.min());

// const tree2 = new BinaryTree();
// tree2.insert(7);
// tree2.insert(4);
// tree2.insert(9);
// tree2.insert(1);
// tree2.insert(6);
// tree2.insert(8);
// // tree2.insert(10);

// console.log("\ntree.equal(tree2)", tree.equal(tree2));
// console.log("\ntree.isThisValidBST()", tree.isThisValidBST());
// console.log("\ntree.isValidBST(tree3)", tree.isValidBST(tree2.root));
// tree2.swapRootLevel();

// console.log(
//   "\ntree.isValidBST(tree3) after swapRootLevel()",
//   tree.isValidBST(tree2.root)
// );

// console.log("\ntree.getNodesAtDistance(2)", tree.getNodesAtDistance(2));
// console.log("\ntree.levelOrderTraversal()");
// tree.levelOrderTraversal();
