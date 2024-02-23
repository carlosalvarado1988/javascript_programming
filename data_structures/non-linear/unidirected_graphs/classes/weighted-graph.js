class Node {
  constructor(label) {
    this.label = label;
  }
}

class Edge {
  constructor(from, to, weight) {
    this.from = from;
    this.to = to;
    this.weight = weight;
  }
}

export class WeightedGraph {
  #nodes = new Map();
  #adjancetEdgesList = new Map(); // a list, value pair of Edges.

  addNode(label) {
    const node = new Node(label);
    this.#nodes.set(label, node);
    this.#adjancetEdgesList.set(node, new Array());
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
    this.#adjancetEdgesList
      .get(fromNode)
      .push(new Edge(fromNode, toNode, weight)); // the value type is an array

    // regresive direction: to have a undirected graph, adding the regresive relation
    this.#adjancetEdgesList
      .get(toNode)
      .push(new Edge(toNode, fromNode, weight));
  }

  print() {
    // A is connected with [B -(2) -> C]
    for (let node of this.#adjancetEdgesList.keys()) {
      let targetsArray = this.#adjancetEdgesList.get(node);
      if (targetsArray.length) {
        console.log(
          `${node.label} is connected to ${targetsArray.map(
            (n) => `[${n.from.label} -(${n.weight})-> ${n.to.label}]`
          )}`
        );
      }
    }
  }
}
