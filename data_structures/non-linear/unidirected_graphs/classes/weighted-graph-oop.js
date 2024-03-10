import { PriorityQueueWithComparator } from "../../../linear/queues/classes/priorityQueueWithComparitor.js";
import { StackWithDynamicArray } from "../../../linear/stacks/classes/stackWithDynamicArray.js";

class Node {
  #edges = new Array(); // a list of Edges.
  constructor(label) {
    this.label = label;
  }

  addEdge(to, weight) {
    this.#edges.push(new Edge(this, to, weight));
  }
  getEdges() {
    return this.#edges;
  }
}

class Edge {
  constructor(from, to, weight) {
    this.from = from;
    this.to = to;
    this.weight = weight;
  }
}

/*
  Enhancing the Node class to implement the DIJKSTRA'S ALGORITH
  including the priority property
*/
class NodeEntry {
  constructor(node, priority) {
    this.node = node;
    this.priority = priority;
  }
}

export class WeightedGraphOOP {
  #nodes = new Map();

  addNode(label) {
    this.#nodes.set(label, new Node(label));
  }

  addEdge(from, to, weight) {
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
    // one direction
    fromNode.addEdge(toNode, weight);
    // regresive direction
    toNode.addEdge(fromNode, weight);
  }
  size() {
    return this.#nodes.size;
  }

  print() {
    console.log("we are in print");
    // A is connected with [B -(2) -> C]
    for (let node of this.#nodes.values()) {
      let edges = node.getEdges();
      if (edges.length) {
        console.log(
          `${node.label} is connected to ${edges.map(
            (n) => `[${n.from.label} -(${n.weight})-> ${n.to.label}]`
          )}`
        );
      }
    }
  }

  /*
    DIJKSTRA'S ALGORITH
    USE FOR GOOGLE MAPS
    SHORTEST PATH
    MAPS
    
    A GREEDY ALGORITHM, TRIES TO FIND THE OPTIONAL SOLUTION TO A PROBLEM BY MAKING OPTIONAL CHOICES IN EACH STEP.

    using deephtraversal and a priority queue to implement
    the algorithm to find the shortest path to a node by reading its weight
*/
  getShortestPath(from, to) {
    // getting the node from the label argument
    const fromNode = this.#nodes.get(from);
    const toNode = this.#nodes.get(to);

    // initializing the Hash table for records
    const distances = new Map();
    for (let node of this.#nodes.values()) {
      distances.set(node, Number.MAX_VALUE);
    }
    distances.set(fromNode, 0); // initializing with 0 the from Node in the table

    // initializing the preivousNodes Hashmap
    const preivousNodes = new Map();

    // initializing a list of visited notes - using a Set data structure
    const visited = new Set();

    /* 
      This class needed the comparitor argument to modify for a custom function
      so I added this class from a sample implementation in internet
    */
    const queue = new PriorityQueueWithComparator();
    // In the example, JAVA allows to replace the comparitor func
    // something like: (nodeEntry) => nodeEntry.priority
    // in this implementation I allow the default comparitor func in place
    // and adapted the enqueue(value, priority) to consider weight as priority value

    // adapting to: enqueue(value, priority)
    queue.enqueue(new NodeEntry(fromNode, 0), 0);

    while (!queue.isEmpty()) {
      let current = queue.dequeue().node;
      visited.add(current);

      for (let edge of current.getEdges()) {
        if (visited.has(edge.to)) continue;
        // the new distance is the distance of the current node + the new weight of the following node
        let newDistance = distances.get(current) + edge.weight;

        // check if the new distance is less than anything pre-recorded neighbor (edge.to)
        if (newDistance < distances.get(edge.to)) {
          // replace the distance value
          distances.set(edge.to, newDistance);
          preivousNodes.set(edge.to, current);
          // now add this neighbor to the queue, with new priority for new lower distance
          // the lower distance should move the node top to the list

          // adapting to: enqueue(value, priority)
          queue.enqueue(new NodeEntry(edge.to, newDistance), newDistance);
        }
      }
    }

    // when the while has completed to update the full table.
    return this.#buildPath(toNode, preivousNodes);
  }

  #buildPath(toNodeRef, preivousNodesHashMap) {
    // we build the path in the stack to make it easy
    const stack = new StackWithDynamicArray();
    stack.add(toNodeRef);
    let preivous = preivousNodesHashMap.get(toNodeRef);

    while (preivous != null) {
      stack.add(preivous); // for every find in the table where the chain connects to a previous, we add it to the stack
      preivous = preivousNodesHashMap.get(preivous); // updating new previous relative to current previous
    }

    // we return the shortest distance to the target node (toNode)
    const path = [];
    while (!stack.isEmpty()) {
      path.push(stack.pop().label);
    }

    return path;
  }

  hasCycle() {
    let visited = new Set();
    for (let node of this.#nodes.values()) {
      // if we havent visited this node yet && // check for cycle: starts with the root, so parent here is null
      if (!visited.has(node) && this.#hasCycleRec(node, null, visited)) {
        return true;
      }
    }
    return false;
  }

  #hasCycleRec(currNode, parent, visitedList) {
    visitedList.add(currNode);

    for (let edge of currNode.getEdges()) {
      if (edge.to == parent) continue;

      // if the next edge was already visited, there is a cycle.
      // the OR section is running the recursive method on the child
      // trying to find if the next edge is already visited too. until any case is true
      if (
        visitedList.has(edge.to) ||
        this.#hasCycleRec(edge.to, currNode, visitedList)
      ) {
        return true;
      }
    }
    // if no visitedList.has(edge.to) is found, then there is no cycle
    return false;
  }

  // Implementing the PRIM's algorithm
  getMinimumSpanningTree() {
    // will need a new instance of a tree
    const tree = new WeightedGraphOOP();
    // will store the connected edges in the priority queue.
    // edge.weight will be the priority comparator
    const queueEdges = new PriorityQueueWithComparator();

    // pick a node to start with
    const startNode = this.#nodes.values().next().value;
    for (let edge of startNode.getEdges()) {
      // adding one by one the edges with weight as priority
      queueEdges.enqueue(edge, edge.weight);
    }
    // this instance creates a new node, not the reference
    // like immutability
    tree.addNode(startNode.label);
    // we should repeat as long all our tree doestn have all the nodes on our graph.

    while (tree.size() < this.size()) {
      let minEdge = queueEdges.dequeue();

      let nextNode = minEdge?.to;
      if (nextNode) {
        if (tree.containsNode(nextNode.label)) continue;
        tree.addNode(nextNode.label);
        tree.addEdge(minEdge.from.label, nextNode.label, minEdge.weight);

        for (let edge of nextNode.getEdges()) {
          if (!tree.containsNode(edge.to.label)) {
            queueEdges.enqueue(edge, edge.weight);
          }
        }
      }
    }
    return tree;
  }

  containsNode(label) {
    return this.#nodes.has(label);
  }
}
