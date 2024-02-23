import { Graph } from "./classes/graph.js";

const graph = new Graph();

graph.addNode("A");
graph.addNode("B");
graph.addNode("C");
graph.addEdge("A", "B");
graph.addEdge("A", "C");
graph.print(); // A is connected to C, B
console.log(graph.topologicalSort());
console.log("traverseDepthFirst - A\n");
graph.traverseDepthFirst("A");
console.log("traverseDepthFirstIter - A\n");
graph.traverseDepthFirstIter("A");
console.log("traverseDepthFirst - B\n");
graph.traverseDepthFirst("B");
console.log("traverseDepthFirstIter - B\n");
graph.traverseDepthFirstIter("B");
console.log("traverseBreadthFirst - A\n");
graph.traverseBreadthFirst("A");
graph.removeNode("B");
graph.print(); // A is connected to C
graph.addNode("D");
graph.addEdge("A", "D");
graph.print(); // A is connected to C, D
graph.removeEdge("A", "C"); // <-- This respects the direction
graph.print(); // A is connected to D

console.log("grap2 - graph2.topologicalSort()\n");
const graph2 = new Graph();
graph2.addNode("X");
graph2.addNode("A");
graph2.addNode("B");
graph2.addNode("P");
graph2.addEdge("X", "A");
graph2.addEdge("X", "B");
graph2.addEdge("A", "P");
graph2.addEdge("B", "P");
graph2.print();
console.log(graph2.topologicalSort());

console.log("grap3 - graph3.hasCycle()\n");
const graph3 = new Graph();
graph3.addNode("A");
graph3.addNode("B");
graph3.addNode("C");
graph3.addEdge("A", "B");
graph3.addEdge("B", "C");
// test area:
graph3.addEdge("A", "C"); // no cycle ---> return false
// graph3.addEdge("C", "A"); // yes cycle ---> return true

console.log("graph3.hasCycle()", graph3.hasCycle());
