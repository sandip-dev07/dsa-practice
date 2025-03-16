const fs = require('fs');

// Create CSV content
let csvContent = "Topic,Question,Difficulty,LeetCode Link\n";

// Arrays
const arrays = [
  ["Arrays", "Find Missing and Repeating element", "Easy", "Link not provided"],
  ["Arrays", "Stock Buy and Sell – Max one Transaction Allowed", "Easy", "Link not provided"],
  ["Arrays", "Remove Duplicates in a Sorted Array", "Easy", "Link not provided"],
  ["Arrays", "Convert Array into Zig-Zag fashion", "Easy", "Link not provided"],
  ["Arrays", "Find third largest element", "Easy", "Link not provided"],
  ["Arrays", "Check Pair Sum in a Sorted and Rotated Array", "Medium", "Link not provided"],
  ["Arrays", "Sort an array of 0s, 1s, and 2s", "Medium", "Link not provided"],
  ["Arrays", "Rotate Array K times", "Medium", "Link not provided"],
  ["Arrays", "Find Majority Element", "Medium", "Link not provided"],
  ["Arrays", "Maximum Subarray Sum – Kadane's Algorithm", "Medium", "Link not provided"],
  ["Arrays", "Stock Buy and Sell – Multiple Transaction Allowed", "Medium", "Link not provided"],
  ["Arrays", "Next Permutation", "Medium", "Link not provided"],
  ["Arrays", "Maximum Product Subarray", "Medium", "Link not provided"],
  ["Arrays", "Maximize i*arr[i] among all Rotations of Array", "Medium", "Link not provided"],
  ["Arrays", "Rearrange Array in Max Min Form", "Medium", "Link not provided"],
  ["Arrays", "Find Smallest Missing Positive Number", "Medium", "Link not provided"],
  ["Arrays", "Minimum Jumps to Reach End", "Medium", "Link not provided"],
  ["Arrays", "Trapping Rain Water", "Hard", "Link not provided"],
  ["Arrays", "Maximum Circular Subarray Sum", "Hard", "Link not provided"],
  ["Arrays", "Closest Palindrome Number", "Hard", "Link not provided"],
  ["Arrays", "Stock Buy and Sell – Max 2 Transactions Allowed", "Hard", "Link not provided"]
];

// Sorting
const sorting = [
  ["Sorting", "Important Sorting Algorithms", "Easy", "Link not provided"],
  ["Sorting", "Maximum Meetings in One Room", "Easy", "Link not provided"],
  ["Sorting", "Chocolate Distribution Problem", "Easy", "Link not provided"],
  ["Sorting", "Find a Pair with the given difference", "Easy", "Link not provided"],
  ["Sorting", "Form the Largest Number", "Medium", "Link not provided"],
  ["Sorting", "Merge Two Sorted Arrays Without Extra Space", "Medium", "Link not provided"],
  ["Sorting", "Count Inversions of an Array", "Medium", "Link not provided"],
  ["Sorting", "Meeting Rooms – II", "Medium", "Link not provided"],
  ["Sorting", "Merge Overlapping Intervals", "Medium", "Link not provided"],
  ["Sorting", "Minimum Swaps to Sort", "Medium", "Link not provided"],
  ["Sorting", "Minimize the Maximum Difference between the Heights", "Medium", "Link not provided"],
  ["Sorting", "Find k largest elements in an array (Quick Sort Method)", "Medium", "Link not provided"],
  ["Sorting", "3 Sum – Triplet Sum in Array", "Medium", "Link not provided"],
  ["Sorting", "4 Sum – All Quadruples", "Medium", "Link not provided"]
];

// Strings
const strings = [
  ["Strings", "First Repeated Character", "Easy", "Link not provided"],
  ["Strings", "Reverse Words", "Easy", "Link not provided"],
  ["Strings", "Roman Number to Integer", "Easy", "Link not provided"],
  ["Strings", "Check Anagram", "Easy", "Link not provided"],
  ["Strings", "Remove Duplicates", "Easy", "Link not provided"],
  ["Strings", "Longest Substring Without Repeating Characters", "Medium", "Link not provided"],
  ["Strings", "Rabin-Karp Algorithm", "Medium", "Link not provided"],
  ["Strings", "Z algorithm", "Medium", "Link not provided"],
  ["Strings", "Longest Palindromic Substring", "Medium", "Link not provided"],
  ["Strings", "Look-and-Say Sequence", "Medium", "Link not provided"],
  ["Strings", "Number to English Words", "Medium", "Link not provided"],
  ["Strings", "KMP Algorithm", "Hard", "Link not provided"],
  ["Strings", "Minimum Characters to Add at Front for Palindrome", "Hard", "Link not provided"],
  ["Strings", "Smallest Window Containing All Characters of Another String", "Hard", "Link not provided"]
];

// Hashing
const hashing = [
  ["Hashing", "At least K Occurences", "Easy", "Link not provided"],
  ["Hashing", "Common Elements in Two Arrays", "Easy", "Link not provided"],
  ["Hashing", "Longest Subarray with 0 Sum", "Medium", "Link not provided"],
  ["Hashing", "Count Distinct Elements In Every Window of Size K", "Medium", "Link not provided"],
  ["Hashing", "4 Sum – Count Quadruplets with Given Sum", "Medium", "Link not provided"],
  ["Hashing", "Check If Array Pair Sums Divisible by k", "Medium", "Link not provided"],
  ["Hashing", "Longest Consecutive Subsequence", "Medium", "Link not provided"],
  ["Hashing", "Count Subarrays having Sum K", "Medium", "Link not provided"],
  ["Hashing", "Longest Subarray With Sum K", "Medium", "Link not provided"],
  ["Hashing", "Longest Subarray With Sum Divisible By K", "Medium", "Link not provided"],
  ["Hashing", "Sort according to an Array", "Medium", "Link not provided"],
  ["Hashing", "Group Anagrams Together", "Medium", "Link not provided"],
  ["Hashing", "Count Maximum Points on Same Line", "Hard", "Link not provided"],
  ["Hashing", "LFU cache", "Hard", "Link not provided"],
  ["Hashing", "Minimum Window Substring", "Hard", "Link not provided"]
];

// Binary Search
const binarySearch = [
  ["Binary Search", "Binary Search Algorithm", "Easy", "Link not provided"],
  ["Binary Search", "N-th root of a number", "Easy", "Link not provided"],
  ["Binary Search", "Single Element in a Sorted Array", "Medium", "Link not provided"],
  ["Binary Search", "Search in a Sorted and Rotated Array", "Medium", "Link not provided"],
  ["Binary Search", "Sum of Middle Elements of two Sorted Arrays", "Medium", "Link not provided"],
  ["Binary Search", "First and Last Occurrence", "Medium", "Link not provided"],
  ["Binary Search", "Median of two Sorted Arrays", "Hard", "Link not provided"],
  ["Binary Search", "Median in a Row-wise sorted Matrix", "Hard", "Link not provided"],
  ["Binary Search", "Allocate Minimum Pages", "Hard", "Link not provided"],
  ["Binary Search", "Aggressive Cows", "Hard", "Link not provided"]
];

// Matrix
const matrix = [
  ["Matrix", "Find the row with maximum number of 1s", "Easy", "Link not provided"],
  ["Matrix", "Rotate an Image 90 Degree Clockwise", "Medium", "Link not provided"],
  ["Matrix", "Spirally traversing a matrix", "Medium", "Link not provided"],
  ["Matrix", "Search in a Sorted Matrix", "Medium", "Link not provided"],
  ["Matrix", "Set Matrix Rows and Columns to Zeroes", "Medium", "Link not provided"],
  ["Matrix", "Max rectangle in Binary Matrix", "Hard", "Link not provided"]
];

// Recursion and Backtracking
const recursionBacktracking = [
  ["Recursion and Backtracking", "Find all Unique Subsets", "Medium", "Link not provided"],
  ["Recursion and Backtracking", "Generate Sums of all Subsets", "Medium", "Link not provided"],
  ["Recursion and Backtracking", "Tower of Hanoi", "Medium", "Link not provided"],
  ["Recursion and Backtracking", "Generate all Unique Permutations", "Medium", "Link not provided"],
  ["Recursion and Backtracking", "Rat in a Maze", "Medium", "Link not provided"],
  ["Recursion and Backtracking", "Combination Sum (Repeated Selection)", "Medium", "Link not provided"],
  ["Recursion and Backtracking", "Combination Sum II (Single Selection)", "Medium", "Link not provided"],
  ["Recursion and Backtracking", "Generate all Palindromic Partitions", "Medium", "Link not provided"],
  ["Recursion and Backtracking", "Generate Valid IP Addresses", "Medium", "Link not provided"],
  ["Recursion and Backtracking", "Word Search", "Medium", "Link not provided"],
  ["Recursion and Backtracking", "N-Queen Problem", "Hard", "Link not provided"],
  ["Recursion and Backtracking", "Solve Sudoku", "Hard", "Link not provided"],
  ["Recursion and Backtracking", "Word Break", "Hard", "Link not provided"]
];

// Stack
const stack = [
  ["Stack", "Validate Parentheses", "Easy", "Link not provided"],
  ["Stack", "Implement two Stacks in an Array", "Medium", "Link not provided"],
  ["Stack", "The Stock Span Problem", "Medium", "Link not provided"],
  ["Stack", "Next Greater Element", "Medium", "Link not provided"],
  ["Stack", "Get Min from Stack", "Medium", "Link not provided"],
  ["Stack", "Evaluation of Postfix Expression", "Medium", "Link not provided"],
  ["Stack", "Longest Valid Parentheses Substring", "Medium", "Link not provided"],
  ["Stack", "Largest Rectangular Area in a Histogram", "Hard", "Link not provided"],
  ["Stack", "Maximum of Minimum for Every Window Size", "Hard", "Link not provided"],
  ["Stack", "Implement K Stacks in an Array", "Hard", "Link not provided"]
];

// Queue
const queue = [
  ["Queue", "Moving Average from Data Stream", "Easy", "Link not provided"],
  ["Queue", "Design Circular Queue", "Medium", "Link not provided"],
  ["Queue", "Stream First Non-repeating", "Medium", "Link not provided"]
];

// Deque
const deque = [
  ["Deque", "Maximum of all subarrays of size K", "Medium", "Link not provided"],
  ["Deque", "Longest Subarray with Absolute Difference Less than or Equal to K", "Medium", "Link not provided"],
  ["Deque", "Shortest Subarray with Sum at Least K", "Hard", "Link not provided"]
];

// Stack + Queue
const stackQueue = [
  ["Stack + Queue", "Stack using Queues", "Easy", "Link not provided"],
  ["Stack + Queue", "Queue using Stacks", "Easy", "Link not provided"]
];

// Heap
const heap = [
  ["Heap", "Connect Ropes with Minimum Cost", "Easy", "Link not provided"],
  ["Heap", "Implement Binary Heap", "Medium", "Link not provided"],
  ["Heap", "Rearrange String to Avoid Adjacent Duplicates", "Medium", "Link not provided"],
  ["Heap", "Kth Largest Element", "Medium", "Link not provided"],
  ["Heap", "Merge k Sorted Arrays", "Medium", "Link not provided"],
  ["Heap", "Top K Frequent Elements", "Medium", "Link not provided"],
  ["Heap", "Merge K Sorted Linked Lists", "Medium", "Link not provided"],
  ["Heap", "Kth Smallest Element in Matrix", "Medium", "Link not provided"],
  ["Heap", "Sort a K Sorted Array", "Medium", "Link not provided"],
  ["Heap", "Find Median in Stream", "Hard", "Link not provided"]
];

// Bit Manipulation
const bitManipulation = [
  ["Bit Manipulation", "Important Bit operations", "Easy", "Link not provided"],
  ["Bit Manipulation", "K-th Bit is Set or Not", "Easy", "Link not provided"],
  ["Bit Manipulation", "Swap 2 Numbers using XOR", "Easy", "Link not provided"],
  ["Bit Manipulation", "Check if a Number is a Power of 2", "Easy", "Link not provided"],
  ["Bit Manipulation", "Rightmost Set Bit", "Easy", "Link not provided"],
  ["Bit Manipulation", "Rightmost Different Bit", "Easy", "Link not provided"],
  ["Bit Manipulation", "Toggle Bits in Given Range", "Easy", "Link not provided"],
  ["Bit Manipulation", "Single in Couples", "Easy", "Link not provided"],
  ["Bit Manipulation", "Division without *, /, or %", "Medium", "Link not provided"],
  ["Bit Manipulation", "Count Set Bits from 1 to N", "Medium", "Link not provided"],
  ["Bit Manipulation", "Generate Subsets using Bit Manipulation", "Medium", "Link not provided"],
  ["Bit Manipulation", "Find Two Numbers with Odd Occurrences", "Medium", "Link not provided"],
  ["Bit Manipulation", "Maximum Subset XOR", "Hard", "Link not provided"]
];

// Linked List
const linkedList = [
  ["Linked List", "Find Middle of the Linked List", "Easy", "Link not provided"],
  ["Linked List", "Reverse a Linked List", "Easy", "Link not provided"],
  ["Linked List", "Kth from End of Linked List", "Easy", "Link not provided"],
  ["Linked List", "Pairwise Swap Elements of Linked List", "Easy", "Link not provided"],
  ["Linked List", "Sort a linked list of 0s, 1s and 2s", "Medium", "Link not provided"],
  ["Linked List", "Rotate a Linked List K times", "Medium", "Link not provided"],
  ["Linked List", "Intersection in Y Shaped Lists", "Medium", "Link not provided"],
  ["Linked List", "Detect Loop in Linked List", "Medium", "Link not provided"],
  ["Linked List", "Remove loop in Linked List", "Medium", "Link not provided"],
  ["Linked List", "Flattening a Linked List", "Medium", "Link not provided"],
  ["Linked List", "Merge two Sorted Linked Lists", "Medium", "Link not provided"],
  ["Linked List", "Add Two Numbers Represented as Linked List", "Medium", "Link not provided"],
  ["Linked List", "Palindrome Linked List", "Medium", "Link not provided"],
  ["Linked List", "Linked List Group Reverse", "Hard", "Link not provided"],
  ["Linked List", "Clone a Linked List with Next and Random Pointer", "Hard", "Link not provided"],
  ["Linked List", "LRU Cache", "Hard", "Link not provided"]
];

// Binary Tree
const binaryTree = [
  ["Binary Tree", "Important Traversal", "Easy", "Link not provided"],
  ["Binary Tree", "Level Order Traversal in Spiral Form", "Easy", "Link not provided"],
  ["Binary Tree", "Height of Binary Tree", "Easy", "Link not provided"],
  ["Binary Tree", "Balanced Tree Check", "Easy", "Link not provided"],
  ["Binary Tree", "Check Symmetric Tree", "Easy", "Link not provided"],
  ["Binary Tree", "Check Identical Trees", "Easy", "Link not provided"],
  ["Binary Tree", "Left View of Binary Tree", "Easy", "Link not provided"],
  ["Binary Tree", "Top View of Binary Tree", "Medium", "Link not provided"],
  ["Binary Tree", "Bottom View of Binary Tree", "Medium", "Link not provided"],
  ["Binary Tree", "Diagonal Tree Traversal", "Medium", "Link not provided"],
  ["Binary Tree", "Vertical Tree Traversal", "Medium", "Link not provided"],
  ["Binary Tree", "LCA in Binary Tree", "Medium", "Link not provided"],
  ["Binary Tree", "Tree Boundary Traversal", "Medium", "Link not provided"],
  ["Binary Tree", "Diameter of a Binary Tree", "Medium", "Link not provided"],
  ["Binary Tree", "Connect Nodes of Levels", "Medium", "Link not provided"],
  ["Binary Tree", "Serialize and Deserialize a Binary Tree", "Medium", "Link not provided"],
  ["Binary Tree", "Construct Tree from Inorder & Preorder", "Medium", "Link not provided"],
  ["Binary Tree", "Maximum Path Sum between 2 Nodes", "Medium", "Link not provided"],
  ["Binary Tree", "Max Path Sum between 2 Leaf Nodes", "Hard", "Link not provided"],
  ["Binary Tree", "Convert Binary Tree to Doubly Linked List", "Hard", "Link not provided"]
];

// Binary Search Tree
const bst = [
  ["Binary Search Tree", "Check for BST", "Easy", "Link not provided"],
  ["Binary Search Tree", "LCA in BST", "Easy", "Link not provided"],
  ["Binary Search Tree", "Sorted Array to BST", "Easy", "Link not provided"],
  ["Binary Search Tree", "Kth Largest Element in BST", "Easy", "Link not provided"],
  ["Binary Search Tree", "Ceil in BST", "Medium", "Link not provided"],
  ["Binary Search Tree", "Largest BST", "Medium", "Link not provided"],
  ["Binary Search Tree", "Merge two BST 's", "Medium", "Link not provided"],
  ["Binary Search Tree", "Preorder to BST", "Medium", "Link not provided"],
  ["Binary Search Tree", "Predecessor and Successor in BST", "Medium", "Link not provided"],
  ["Binary Search Tree", "Binary Search Tree Iterator", "Medium", "Link not provided"],
  ["Binary Search Tree", "Delete a Node from BST", "Medium", "Link not provided"],
  ["Binary Search Tree", "Balance a Binary Search Tree", "Medium", "Link not provided"]
];

// Greedy
const greedy = [
  ["Greedy", "Minimize the Sum of Product", "Easy", "Link not provided"],
  ["Greedy", "Largest Number Possible", "Easy", "Link not provided"],
  ["Greedy", "Minimum Number of Coins", "Easy", "Link not provided"],
  ["Greedy", "Assign Cookies", "Easy", "Link not provided"],
  ["Greedy", "Gas Station", "Medium", "Link not provided"],
  ["Greedy", "Activity Selection", "Medium", "Link not provided"],
  ["Greedy", "Fractional Knapsack", "Medium", "Link not provided"],
  ["Greedy", "Job Sequencing", "Medium", "Link not provided"],
  ["Greedy", "Huffman Encoding", "Hard", "Link not provided"]
];

// Dynamic Programming
const dp = [
  ["Dynamic Programming", "Ways to Reach the Nth Stair", "Medium", "Link not provided"],
  ["Dynamic Programming", "House Robber II", "Medium", "Link not provided"],
  ["Dynamic Programming", "Coin Change (Minimum Coins)", "Medium", "Link not provided"],
  ["Dynamic Programming", "Coin Change (Count Ways)", "Medium", "Link not provided"],
  ["Dynamic Programming", "Longest Common Substring", "Medium", "Link not provided"],
  ["Dynamic Programming", "Longest Increasing Subsequence", "Medium", "Link not provided"],
  ["Dynamic Programming", "Longest Common Subsequence", "Medium", "Link not provided"],
  ["Dynamic Programming", "0 – 1 Knapsack Problem", "Medium", "Link not provided"],
  ["Dynamic Programming", "Partition Equal Subset Sum", "Medium", "Link not provided"],
  ["Dynamic Programming", "Minimum Insertions to Form Palindrome", "Medium", "Link not provided"],
  ["Dynamic Programming", "Maximize The Cut Segments", "Medium", "Link not provided"],
  ["Dynamic Programming", "Maximum Path Sum in Matrix", "Medium", "Link not provided"],
  ["Dynamic Programming", "Rod Cutting", "Medium", "Link not provided"],
  ["Dynamic Programming", "Egg Dropping Puzzle", "Medium", "Link not provided"],
  ["Dynamic Programming", "Word Break", "Medium", "Link not provided"],
  ["Dynamic Programming", "Optimal Strategy For A Game", "Medium", "Link not provided"],
  ["Dynamic Programming", "Wildcard Pattern Matching", "Medium", "Link not provided"],
  ["Dynamic Programming", "Edit Distance", "Medium", "Link not provided"],
  ["Dynamic Programming", "Matrix Chain Multiplication", "Hard", "Link not provided"],
  ["Dynamic Programming", "Palindromic Partitioning", "Hard", "Link not provided"],
  ["Dynamic Programming", "Boolean Parenthesization", "Hard", "Link not provided"]
];

// Graph
const graph = [
  ["Graph", "DFS of Graph", "Easy", "Link not provided"],
  ["Graph", "BFS of Graph", "Easy", "Link not provided"],
  ["Graph", "Detect Cycle in Undirected Graph", "Medium", "Link not provided"],
  ["Graph", "Detect Cycle in a Directed Graph", "Medium", "Link not provided"],
  ["Graph", "Detect a Negative Cycle", "Medium", "Link not provided"],
  ["Graph", "Topological Sorting", "Medium", "Link not provided"],
  ["Graph", "Shortest Path in Directed Acyclic Graph", "Medium", "Link not provided"],
  ["Graph", "Kahn's Algorithm", "Medium", "Link not provided"],
  ["Graph", "Dijkstra Algorithm", "Medium", "Link not provided"],
  ["Graph", "Bellman-Ford Algorithm", "Medium", "Link not provided"],
  ["Graph", "Floyd Warshall Algorithm", "Medium", "Link not provided"],
  ["Graph", "Prim's Algorithm", "Medium", "Link not provided"],
  ["Graph", "Kruskal's Algorithm", "Medium", "Link not provided"],
  ["Graph", "Euler Path and Circuit", "Medium", "Link not provided"],
  ["Graph", "Hamiltonian Path and Circuit", "Medium", "Link not provided"],
  ["Graph", "Kosaraju's Algorithm", "Hard", "Link not provided"],
  ["Graph", "Tarjan's Algorithm", "Hard", "Link not provided"],
  ["Graph", "Bridges in Graph", "Hard", "Link not provided"],
  ["Graph", "Articulation Points in Graph", "Hard", "Link not provided"],
  ["Graph", "Disjoint Set (Union Find Algorithm)", "Hard", "Link not provided"],
  ["Graph", "Mother Vertex", "Medium", "Link not provided"],
  ["Graph", "Rotten Oranges", "Medium", "Link not provided"],
  ["Graph", "Flood fill Algorithm", "Medium", "Link not provided"],
  ["Graph", "Replace O's with X's", "Medium", "Link not provided"],
  ["Graph", "Steps by Knight", "Medium", "Link not provided"],
  ["Graph", "Bipartite Graph", "Medium", "Link not provided"],
  ["Graph", "Number of Islands", "Medium", "Link not provided"],
  ["Graph", "Clone an Undirected Graph", "Medium", "Link not provided"],
  ["Graph", "M-Coloring Problem", "Medium", "Link not provided"],
  ["Graph", "Alien Dictionary", "Hard", "Link not provided"],
  ["Graph", "Circle of Strings", "Hard", "Link not provided"],
  ["Graph", "Minimum Cost Path", "Hard", "Link not provided"]
];

// Trie
const trie = [
  ["Trie", "Insert, Search and Delete in Trie", "Medium", "Link not provided"],
  ["Trie", "Longest Common Prefix of Strings", "Medium", "Link not provided"],
  ["Trie", "Prefix Suffix String", "Medium", "Link not provided"],
  ["Trie", "Word Break (Trie)", "Hard", "Link not provided"],
  ["Trie", "Phone Directory", "Hard", "Link not provided"],
  ["Trie", "Maximum XOR Subarray", "Hard", "Link not provided"]
];

// Combine all categories
const allQuestions = [
  ...arrays,
  ...sorting,
  ...strings,
  ...hashing,
  ...binarySearch,
  ...matrix,
  ...recursionBacktracking,
  ...stack,
  ...queue,
  ...deque,
  ...stackQueue,
  ...heap,
  ...bitManipulation,
  ...linkedList,
  ...binaryTree,
  ...bst,
  ...greedy,
  ...dp,
  ...graph,
  ...trie
];

// Add all questions to CSV content
allQuestions.forEach(question => {
  csvContent += `"${question[0]}","${question[1]}","${question[2]}","${question[3]}"\n`;
});

// Write to file
fs.writeFileSync('dsa_questions.csv', csvContent);

console.log("CSV file has been generated successfully!");
console.log("Total number of questions:", allQuestions.length);
console.log("First few lines of the CSV:");
console.log(csvContent.split('\n').slice(0, 5).join('\n'));

