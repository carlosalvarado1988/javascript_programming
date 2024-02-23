import { TriesWithHashMap } from "./classes/triesWithHashMap.js";

const trie = new TriesWithHashMap();

trie.insert("cat");
console.log("Do traverse");
trie.traverse();
trie.insert("can");
trie.insert("cap");
trie.insert("canada");
console.log("Done inserting cat, can, canada");
console.log("Check contains");
console.log('trie.contains("cat")', trie.contains("cat"));
console.log('trie.contains("can")', trie.contains("can"));
console.log('trie.contains("cap")', trie.contains("cap"));
console.log('trie.contains("cana")', trie.contains("cana"));
console.log('trie.contains("canada")', trie.contains("canada"));

console.log("attempt to remove cat");
trie.remove("cat");
console.log('trie.contains("cat")', trie.contains("cat"));
trie.remove("cast"); // does do anything

console.log("testing autocomplete");
console.log("trie.findWords('c')", trie.findWords("c"));
console.log("trie.findWords('ca')", trie.findWords("ca"));
console.log("trie.findWords('cana')", trie.findWords("cana"));
console.log("trie.findWords('pepe')", trie.findWords("pepe"));
console.log("trie.findWords('cana')", trie.findWords(null));
