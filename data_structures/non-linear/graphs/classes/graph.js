import { StackWithDynamicArray } from "../../../linear/stacks/classes/stackWithDynamicArray.js";
import { ObjectQueue } from "../../../linear/queues/classes/index.js";

class Node {
  constructor(label) {
    this.label = label;
  }
}

export class Graph {
  #nodes = new Map();
  #adjancetList = new Map(); // a list, value pair of Nodes.

  addNode(label) {
    const node = new Node(label);
    this.#nodes.set(label, node);
    this.#adjancetList.set(node, new Array());
  }
  addEdge(from, to) {
    const fromNode = this.#nodes.get(from);
    if (!fromNode) {
      console.error("Error from not found", from);
      return;
    }
    const toNode = this.#nodes.get(to);
    if (!toNode) {
      console.error("Error from not found", to);
      return;
    }
    this.#adjancetList.get(fromNode).push(toNode); // the value type is an array
    // to have a non-directed graph, adding the regresive relation
    // this.#adjancetList.get(toNode).push(fromNode);
  }
  removeNode(label) {
    const nodeTarget = this.#nodes.get(label);
    if (!nodeTarget) return;

    for (let node of this.#adjancetList.keys()) {
      // cleaning the nodeTarget from all nodes
      this.#adjancetList.set(
        node,
        this.#adjancetList.get(node).filter((e) => e !== nodeTarget)
      );
    }

    // removing nodeTarget from key in #adjancetList
    this.#adjancetList.delete(nodeTarget);
    // removing nodeTarget nodes
    this.#nodes.delete(nodeTarget);
  }
  removeEdge(from, to) {
    const fromNode = this.#nodes.get(from);
    const toNode = this.#nodes.get(to);
    if (!fromNode && !toNode) {
      return;
    }

    this.#adjancetList.set(
      fromNode,
      this.#adjancetList.get(fromNode).filter((e) => e !== toNode)
    );
  }

  print() {
    // A is connected with [B,C]
    // B is connected with [A]
    for (let node of this.#adjancetList.keys()) {
      let targetsArray = this.#adjancetList.get(node);
      if (targetsArray.length) {
        console.log(
          `${node.label} is connected to ${targetsArray.map((n) => n.label)}`
        );
      }
    }
  }

  // implementing traversal
  // DepthFirst using Recursion
  traverseDepthFirst(root) {
    let node = this.#nodes.get(root);
    if (!node) return;
    this.#traverseDepthFirstRec(node, new Map());
  }
  #traverseDepthFirstRec(currNode, visited) {
    console.log(currNode.label);
    visited.set(currNode);

    // visit all the nightboors in this node.
    // using the this.#adjancetList
    for (let node of this.#adjancetList.get(currNode)) {
      if (!visited.has(node)) {
        // recursively visit each child node from here
        this.#traverseDepthFirstRec(node, visited);
      }
    }
  }
  // DepthFirst using Iterations (any loop)
  // Note: Rec vs Iterative give slight different result when console log.
  // still going in DepthFirst direction, still valid
  // there isn't only one way to go from top to bottom.
  traverseDepthFirstIter(root) {
    let node = this.#nodes.get(root);
    if (!node) return;

    const visited = new Map();
    const stack = new StackWithDynamicArray();
    stack.add(node);

    while (!stack.isEmpty()) {
      let current = stack.pop();
      if (visited.has(current)) continue;

      console.log(current.label);
      visited.set(current);

      for (let neighbour of this.#adjancetList.get(current)) {
        if (!visited.has(neighbour)) stack.add(neighbour);
      }
    }
  }

  /*
  Implementing Traverse Breath First
  going bottom-up  
  */
  traverseBreadthFirst(root) {
    const node = this.#nodes.get(root);
    if (!node) return;

    const visited = new Map();
    const queue = new ObjectQueue();
    queue.enqueue(node);

    while (!queue.isEmpty) {
      let current = queue.dequeue();

      if (visited.has(current)) continue;

      console.log(current.label);
      visited.set(current);

      for (let neighbour of this.#adjancetList.get(current)) {
        if (!visited.has(neighbour)) queue.enqueue(neighbour);
      }
    }
  }

  topologicalSort() {
    const visited = new Map();
    const stack = new StackWithDynamicArray();

    for (let node of this.#nodes.values()) {
      this.#topologicalSort(node, visited, stack);
    }

    let sorted = [];
    while (!stack.isEmpty()) {
      const node = stack.pop();
      sorted.push(node.label);
    }
    return sorted;
  }

  #topologicalSort(node, visited, stack) {
    if (!node) return;
    if (visited.has(node)) return;

    visited.set(node);

    for (let neighbour of this.#adjancetList.get(node)) {
      this.#topologicalSort(neighbour, visited, stack);
    }

    stack.add(node);
  }

  hasCycle() {
    const all = new Map(this.#nodes);
    const visiting = new Map();
    const visited = new Map();

    // while (all.?) {
    //   // Need to find the Map() equivalent for Jave all.isEmpty to detect the .next() iteration completed.
    //   let current = all.values().next().value; // note we need the value portion of the node to go down as current
    //   if (this.#hasCycleRecursive(current, all, visiting, visited)) return true;
    // }

    // the alternative is here:
    for (let current of all.values()) {
      if (this.#hasCycleRecursive(current, all, visiting, visited)) return true;
    }

    return false;
  }

  #hasCycleRecursive(node, all, visiting, visited) {
    // pass node from all to visiting
    all.delete(node);
    visiting.set(node);

    // visit all its neightboors
    for (let neighbour of this.#adjancetList.get(node)) {
      if (visited.has(neighbour)) continue;
      if (visiting.has(neighbour)) {
        return true;
      }
      if (this.#hasCycleRecursive(neighbour, all, visiting, visited))
        return true;
    }

    // we didnt find a cycle, move node from visiting to visited
    visiting.delete(node);
    visited.set(node);
  }
}
