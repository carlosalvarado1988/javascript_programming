import { WeightedGraph } from "./classes/weighted-graph.js";
import { WeightedGraphOOP } from "./classes/weighted-graph-oop.js";

console.log("WeightedGraph");
const graph = new WeightedGraph();
graph.addNode("A");
graph.addNode("B");
graph.addNode("C");
graph.addEdge("A", "B", 3);
graph.addEdge("A", "C", 2);
graph.print();
console.log("\n");

console.log("WeightedGraphOOP");
const graph2 = new WeightedGraphOOP();
graph2.addNode("A");
graph2.addNode("B");
graph2.addNode("C");
graph2.addEdge("A", "B", 3);
graph2.addEdge("B", "C", 2);
graph2.addEdge("A", "C", 10);
graph2.print();
console.log("shortest Path", graph2.getShortestPath("A", "C"));
console.log("\n");
