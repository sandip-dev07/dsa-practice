const fs = require('fs');

// Create CSV content
let csvContent = "Topic,Question,Difficulty,LeetCode Link\n";

// Arrays
const arrays = [
  ["Arrays", "Find Missing and Repeating element", "Easy", "https://leetcode.com/problems/set-mismatch/description/"],
  ["Arrays", "Stock Buy and Sell – Max one Transaction Allowed", "Easy", "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/description/"],
  ["Arrays", "Remove Duplicates in a Sorted Array", "Easy", "https://leetcode.com/problems/remove-duplicates-from-sorted-array/description/"],
  ["Arrays", "Convert Array into Zig-Zag fashion", "Easy", "https://leetcode.com/problems/wiggle-sort/description/"],
  ["Arrays", "Find third largest element", "Easy", "https://leetcode.com/problems/third-maximum-number/description/"],
  ["Arrays", "Check Pair Sum in a Sorted and Rotated Array", "Medium", "https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/description/"],
  ["Arrays", "Sort an array of 0s, 1s, and 2s", "Medium", "https://leetcode.com/problems/sort-colors/description/"],
  ["Arrays", "Rotate Array K times", "Medium", "https://leetcode.com/problems/rotate-array/description/"],
  ["Arrays", "Find Majority Element", "Medium", "https://leetcode.com/problems/majority-element/description/"],
  ["Arrays", "Maximum Subarray Sum – Kadane's Algorithm", "Medium", "https://leetcode.com/problems/maximum-subarray/description/"],
  ["Arrays", "Stock Buy and Sell – Multiple Transaction Allowed", "Medium", "https://leetcode.com/problems/best-time-to-buy-and-sell-stock-ii/description/"],
  ["Arrays", "Next Permutation", "Medium", "https://leetcode.com/problems/next-permutation/description/"],
  ["Arrays", "Maximum Product Subarray", "Medium", "https://leetcode.com/problems/maximum-product-subarray/description/"],
  ["Arrays", "Maximize i*arr[i] among all Rotations of Array", "Medium", "https://leetcode.com/problems/rotate-function/description/"],
  ["Arrays", "Rearrange Array in Max Min Form", "Medium", "https://leetcode.com/problems/rearrange-array-elements-by-sign/description/"],
  ["Arrays", "Find Smallest Missing Positive Number", "Medium", "https://leetcode.com/problems/first-missing-positive/description/"],
  ["Arrays", "Minimum Jumps to Reach End", "Medium", "https://leetcode.com/problems/jump-game-ii/description/"],
  ["Arrays", "Trapping Rain Water", "Hard", "https://leetcode.com/problems/trapping-rain-water/description/"],
  ["Arrays", "Maximum Circular Subarray Sum", "Hard", "https://leetcode.com/problems/maximum-sum-circular-subarray/description/"],
  ["Arrays", "Closest Palindrome Number", "Hard", "https://leetcode.com/problems/find-the-closest-palindrome/description/"],
  ["Arrays", "Stock Buy and Sell – Max 2 Transactions Allowed", "Hard", "https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iii/description/"]
];

// Sorting
const sorting = [
  ["Sorting", "Important Sorting Algorithms", "Easy", "https://www.geeksforgeeks.org/sorting-algorithms/"],
  ["Sorting", "Maximum Meetings in One Room", "Easy", "https://www.geeksforgeeks.org/activity-selection-problem-greedy-algo-1/"],
  ["Sorting", "Chocolate Distribution Problem", "Easy", "https://www.geeksforgeeks.org/chocolate-distribution-problem/"],
  ["Sorting", "Find a Pair with the given difference", "Easy", "https://leetcode.com/problems/find-k-diff-pairs-in-an-array/description/"],
  ["Sorting", "Form the Largest Number", "Medium", "https://leetcode.com/problems/largest-number/description/"],
  ["Sorting", "Merge Two Sorted Arrays Without Extra Space", "Medium", "https://leetcode.com/problems/merge-sorted-array/description/"],
  ["Sorting", "Count Inversions of an Array", "Medium", "https://www.geeksforgeeks.org/counting-inversions/"],
  ["Sorting", "Meeting Rooms – II", "Medium", "https://leetcode.com/problems/meeting-rooms-ii/description/"],
  ["Sorting", "Merge Overlapping Intervals", "Medium", "https://leetcode.com/problems/merge-intervals/description/"],
  ["Sorting", "Minimum Swaps to Sort", "Medium", "https://www.geeksforgeeks.org/minimum-number-swaps-required-sort-array/"],
  ["Sorting", "Minimize the Maximum Difference between the Heights", "Medium", "https://www.geeksforgeeks.org/minimize-the-maximum-difference-between-the-heights/"],
  ["Sorting", "Find k largest elements in an array (Quick Sort Method)", "Medium", "https://leetcode.com/problems/kth-largest-element-in-an-array/description/"],
  ["Sorting", "3 Sum – Triplet Sum in Array", "Medium", "https://leetcode.com/problems/3sum/description/"],
  ["Sorting", "4 Sum – All Quadruples", "Medium", "https://leetcode.com/problems/4sum/description/"]
];

// Strings
const strings = [
  ["Strings", "First Repeated Character", "Easy", "https://www.geeksforgeeks.org/find-first-repeated-character-string/"],
  ["Strings", "Reverse Words", "Easy", "https://leetcode.com/problems/reverse-words-in-a-string/description/"],
  ["Strings", "Roman Number to Integer", "Easy", "https://leetcode.com/problems/roman-to-integer/description/"],
  ["Strings", "Check Anagram", "Easy", "https://leetcode.com/problems/valid-anagram/description/"],
  ["Strings", "Remove Duplicates", "Easy", "https://leetcode.com/problems/remove-duplicate-letters/description/"],
  ["Strings", "Longest Substring Without Repeating Characters", "Medium", "https://leetcode.com/problems/longest-substring-without-repeating-characters/description/"],
  ["Strings", "Rabin-Karp Algorithm", "Medium", "https://www.geeksforgeeks.org/rabin-karp-algorithm-for-pattern-searching/"],
  ["Strings", "Z algorithm", "Medium", "https://www.geeksforgeeks.org/z-algorithm-linear-time-pattern-searching-algorithm/"],
  ["Strings", "Longest Palindromic Substring", "Medium", "https://leetcode.com/problems/longest-palindromic-substring/description/"],
  ["Strings", "Look-and-Say Sequence", "Medium", "https://leetcode.com/problems/count-and-say/description/"],
  ["Strings", "Number to English Words", "Medium", "https://leetcode.com/problems/integer-to-english-words/description/"],
  ["Strings", "KMP Algorithm", "Hard", "https://www.geeksforgeeks.org/kmp-algorithm-for-pattern-searching/"],
  ["Strings", "Minimum Characters to Add at Front for Palindrome", "Hard", "https://leetcode.com/problems/shortest-palindrome/description/"],
  ["Strings", "Smallest Window Containing All Characters of Another String", "Hard", "https://leetcode.com/problems/minimum-window-substring/description/"]
];

// Hashing
const hashing = [
  ["Hashing", "At least K Occurences", "Easy", "https://leetcode.com/problems/first-letter-to-appear-twice/description/"],
  ["Hashing", "Common Elements in Two Arrays", "Easy", "https://leetcode.com/problems/intersection-of-two-arrays/description/"],
  ["Hashing", "Longest Subarray with 0 Sum", "Medium", "https://www.geeksforgeeks.org/find-the-largest-subarray-with-0-sum/"],
  ["Hashing", "Count Distinct Elements In Every Window of Size K", "Medium", "https://www.geeksforgeeks.org/count-distinct-elements-in-every-window-of-size-k/"],
  ["Hashing", "4 Sum – Count Quadruplets with Given Sum", "Medium", "https://leetcode.com/problems/4sum-ii/description/"],
  ["Hashing", "Check If Array Pair Sums Divisible by k", "Medium", "https://leetcode.com/problems/check-if-array-pairs-are-divisible-by-k/description/"],
  ["Hashing", "Longest Consecutive Subsequence", "Medium", "https://leetcode.com/problems/longest-consecutive-sequence/description/"],
  ["Hashing", "Count Subarrays having Sum K", "Medium", "https://leetcode.com/problems/subarray-sum-equals-k/description/"],
  ["Hashing", "Longest Subarray With Sum K", "Medium", "https://www.geeksforgeeks.org/longest-sub-array-sum-k/"],
  ["Hashing", "Longest Subarray With Sum Divisible By K", "Medium", "https://leetcode.com/problems/longest-subarray-with-sum-divisible-by-k/description/"],
  ["Hashing", "Sort according to an Array", "Medium", "https://leetcode.com/problems/relative-sort-array/description/"],
  ["Hashing", "Group Anagrams Together", "Medium", "https://leetcode.com/problems/group-anagrams/description/"],
  ["Hashing", "Count Maximum Points on Same Line", "Hard", "https://leetcode.com/problems/max-points-on-a-line/description/"],
  ["Hashing", "LFU cache", "Hard", "https://leetcode.com/problems/lfu-cache/description/"],
  ["Hashing", "Minimum Window Substring", "Hard", "https://leetcode.com/problems/minimum-window-substring/description/"]
];

// Binary Search
const binarySearch = [
  ["Binary Search", "Binary Search Algorithm", "Easy", "https://leetcode.com/problems/binary-search/description/"],
  ["Binary Search", "N-th root of a number", "Easy", "https://www.geeksforgeeks.org/calculating-n-th-real-root-using-binary-search/"],
  ["Binary Search", "Single Element in a Sorted Array", "Medium", "https://leetcode.com/problems/single-element-in-a-sorted-array/description/"],
  ["Binary Search", "Search in a Sorted and Rotated Array", "Medium", "https://leetcode.com/problems/search-in-rotated-sorted-array/description/"],
  ["Binary Search", "Sum of Middle Elements of two Sorted Arrays", "Medium", "https://leetcode.com/problems/median-of-two-sorted-arrays/description/"],
  ["Binary Search", "First and Last Occurrence", "Medium", "https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/description/"],
  ["Binary Search", "Median of two Sorted Arrays", "Hard", "https://leetcode.com/problems/median-of-two-sorted-arrays/description/"],
  ["Binary Search", "Median in a Row-wise sorted Matrix", "Hard", "https://leetcode.com/problems/kth-smallest-element-in-a-sorted-matrix/description/"],
  ["Binary Search", "Allocate Minimum Pages", "Hard", "https://leetcode.com/problems/split-array-largest-sum/description/"],
  ["Binary Search", "Aggressive Cows", "Hard", "https://www.geeksforgeeks.org/aggressive-cows/"]
];

// Matrix
const matrix = [
  ["Matrix", "Find the row with maximum number of 1s", "Easy", "https://www.geeksforgeeks.org/find-row-number-binary-matrix-maximum-number-1s/"],
  ["Matrix", "Rotate an Image 90 Degree Clockwise", "Medium", "https://leetcode.com/problems/rotate-image/description/"],
  ["Matrix", "Spirally traversing a matrix", "Medium", "https://leetcode.com/problems/spiral-matrix/description/"],
  ["Matrix", "Search in a Sorted Matrix", "Medium", "https://leetcode.com/problems/search-a-2d-matrix/description/"],
  ["Matrix", "Set Matrix Rows and Columns to Zeroes", "Medium", "https://leetcode.com/problems/set-matrix-zeroes/description/"],
  ["Matrix", "Max rectangle in Binary Matrix", "Hard", "https://leetcode.com/problems/maximal-rectangle/description/"]
];

// Recursion and Backtracking
const recursionBacktracking = [
  ["Recursion and Backtracking", "Find all Unique Subsets", "Medium", "https://leetcode.com/problems/subsets/description/"],
  ["Recursion and Backtracking", "Generate Sums of all Subsets", "Medium", "https://leetcode.com/problems/subsets-ii/description/"],
  ["Recursion and Backtracking", "Tower of Hanoi", "Medium", "https://www.geeksforgeeks.org/c-program-for-tower-of-hanoi/"],
  ["Recursion and Backtracking", "Generate all Unique Permutations", "Medium", "https://leetcode.com/problems/permutations/description/"],
  ["Recursion and Backtracking", "Rat in a Maze", "Medium", "https://www.geeksforgeeks.org/rat-in-a-maze-backtracking-2/"],
  ["Recursion and Backtracking", "Combination Sum (Repeated Selection)", "Medium", "https://leetcode.com/problems/combination-sum/description/"],
  ["Recursion and Backtracking", "Combination Sum II (Single Selection)", "Medium", "https://leetcode.com/problems/combination-sum-ii/description/"],
  ["Recursion and Backtracking", "Generate all Palindromic Partitions", "Medium", "https://leetcode.com/problems/palindrome-partitioning/description/"],
  ["Recursion and Backtracking", "Generate Valid IP Addresses", "Medium", "https://leetcode.com/problems/restore-ip-addresses/description/"],
  ["Recursion and Backtracking", "Word Search", "Medium", "https://leetcode.com/problems/word-search/description/"],
  ["Recursion and Backtracking", "N-Queen Problem", "Hard", "https://leetcode.com/problems/n-queens/description/"],
  ["Recursion and Backtracking", "Solve Sudoku", "Hard", "https://leetcode.com/problems/sudoku-solver/description/"],
  ["Recursion and Backtracking", "Word Break", "Hard", "https://leetcode.com/problems/word-break-ii/description/"]
];

// Stack
const stack = [
  ["Stack", "Validate Parentheses", "Easy", "https://leetcode.com/problems/valid-parentheses/description/"],
  ["Stack", "Implement two Stacks in an Array", "Medium", "https://www.geeksforgeeks.org/implement-two-stacks-in-an-array/"],
  ["Stack", "The Stock Span Problem", "Medium", "https://leetcode.com/problems/online-stock-span/description/"],
  ["Stack", "Next Greater Element", "Medium", "https://leetcode.com/problems/next-greater-element-i/description/"],
  ["Stack", "Get Min from Stack", "Medium", "https://leetcode.com/problems/min-stack/description/"],
  ["Stack", "Evaluation of Postfix Expression", "Medium", "https://leetcode.com/problems/evaluate-reverse-polish-notation/description/"],
  ["Stack", "Longest Valid Parentheses Substring", "Medium", "https://leetcode.com/problems/longest-valid-parentheses/description/"],
  ["Stack", "Largest Rectangular Area in a Histogram", "Hard", "https://leetcode.com/problems/largest-rectangle-in-histogram/description/"],
  ["Stack", "Maximum of Minimum for Every Window Size", "Hard", "https://www.geeksforgeeks.org/find-the-maximum-of-minimums-for-every-window-size-in-a-given-array/"],
  ["Stack", "Implement K Stacks in an Array", "Hard", "https://www.geeksforgeeks.org/efficiently-implement-k-stacks-single-array/"]
];

// Queue
const queue = [
  ["Queue", "Moving Average from Data Stream", "Easy", "https://leetcode.com/problems/moving-average-from-data-stream/description/"],
  ["Queue", "Design Circular Queue", "Medium", "https://leetcode.com/problems/design-circular-queue/description/"],
  ["Queue", "Stream First Non-repeating", "Medium", "https://www.geeksforgeeks.org/first-non-repeating-character-in-a-stream/"]
];

// Deque
const deque = [
  ["Deque", "Maximum of all subarrays of size K", "Medium", "https://leetcode.com/problems/sliding-window-maximum/description/"],
  ["Deque", "Longest Subarray with Absolute Difference Less than or Equal to K", "Medium", "https://leetcode.com/problems/longest-continuous-subarray-with-absolute-diff-less-than-or-equal-to-limit/description/"],
  ["Deque", "Shortest Subarray with Sum at Least K", "Hard", "https://leetcode.com/problems/shortest-subarray-with-sum-at-least-k/description/"]
];

// Stack + Queue
const stackQueue = [
  ["Stack + Queue", "Stack using Queues", "Easy", "https://leetcode.com/problems/implement-stack-using-queues/description/"],
  ["Stack + Queue", "Queue using Stacks", "Easy", "https://leetcode.com/problems/implement-queue-using-stacks/description/"]
];

// Heap
const heap = [
  ["Heap", "Connect Ropes with Minimum Cost", "Easy", "https://leetcode.com/problems/minimum-cost-to-connect-sticks/description/"],
  ["Heap", "Implement Binary Heap", "Medium", "https://www.geeksforgeeks.org/binary-heap/"],
  ["Heap", "Rearrange String to Avoid Adjacent Duplicates", "Medium", "https://leetcode.com/problems/reorganize-string/description/"],
  ["Heap", "Kth Largest Element", "Medium", "https://leetcode.com/problems/kth-largest-element-in-an-array/description/"],
  ["Heap", "Merge k Sorted Arrays", "Medium", "https://leetcode.com/problems/merge-k-sorted-lists/description/"],
  ["Heap", "Top K Frequent Elements", "Medium", "https://leetcode.com/problems/top-k-frequent-elements/description/"],
  ["Heap", "Merge K Sorted Linked Lists", "Medium", "https://leetcode.com/problems/merge-k-sorted-lists/description/"],
  ["Heap", "Kth Smallest Element in Matrix", "Medium", "https://leetcode.com/problems/kth-smallest-element-in-a-sorted-matrix/description/"],
  ["Heap", "Sort a K Sorted Array", "Medium", "https://www.geeksforgeeks.org/nearly-sorted-algorithm/"],
  ["Heap", "Find Median in Stream", "Hard", "https://leetcode.com/problems/find-median-from-data-stream/description/"]
];

// Bit Manipulation
const bitManipulation = [
  ["Bit Manipulation", "Important Bit operations", "Easy", "https://www.geeksforgeeks.org/basic-bitwise-operators-java/"],
  ["Bit Manipulation", "K-th Bit is Set or Not", "Easy", "https://www.geeksforgeeks.org/check-whether-k-th-bit-set-not/"],
  ["Bit Manipulation", "Swap 2 Numbers using XOR", "Easy", "https://www.geeksforgeeks.org/swap-two-numbers-without-using-temporary-variable/"],
  ["Bit Manipulation", "Check if a Number is a Power of 2", "Easy", "https://leetcode.com/problems/power-of-two/description/"],
  ["Bit Manipulation", "Rightmost Set Bit", "Easy", "https://www.geeksforgeeks.org/position-of-rightmost-set-bit/"],
  ["Bit Manipulation", "Rightmost Different Bit", "Easy", "https://www.geeksforgeeks.org/position-of-rightmost-different-bit/"],
  ["Bit Manipulation", "Toggle Bits in Given Range", "Easy", "https://www.geeksforgeeks.org/toggle-bits-given-range/"],
  ["Bit Manipulation", "Single in Couples", "Easy", "https://leetcode.com/problems/single-number/description/"],
  ["Bit Manipulation", "Division without *, /, or %", "Medium", "https://leetcode.com/problems/divide-two-integers/description/"],
  ["Bit Manipulation", "Count Set Bits from 1 to N", "Medium", "https://leetcode.com/problems/counting-bits/description/"],
  ["Bit Manipulation", "Generate Subsets using Bit Manipulation", "Medium", "https://www.geeksforgeeks.org/power-set/"],
  ["Bit Manipulation", "Find Two Numbers with Odd Occurrences", "Medium", "https://www.geeksforgeeks.org/find-two-numbers-odd-occurrences-array/"],
  ["Bit Manipulation", "Maximum Subset XOR", "Hard", "https://www.geeksforgeeks.org/find-maximum-subset-xor-given-set/"]
];

// Linked List
const linkedList = [
  ["Linked List", "Find Middle of the Linked List", "Easy", "https://leetcode.com/problems/middle-of-the-linked-list/description/"],
  ["Linked List", "Reverse a Linked List", "Easy", "https://leetcode.com/problems/reverse-linked-list/description/"],
  ["Linked List", "Kth from End of Linked List", "Easy", "https://leetcode.com/problems/remove-nth-node-from-end-of-list/description/"],
  ["Linked List", "Pairwise Swap Elements of Linked List", "Easy", "https://leetcode.com/problems/swap-nodes-in-pairs/description/"],
  ["Linked List", "Sort a linked list of 0s, 1s and 2s", "Medium", "https://leetcode.com/problems/sort-list/description/"],
  ["Linked List", "Rotate a Linked List K times", "Medium", "https://leetcode.com/problems/rotate-list/description/"],
  ["Linked List", "Intersection in Y Shaped Lists", "Medium", "https://leetcode.com/problems/intersection-of-two-linked-lists/description/"],
  ["Linked List", "Detect Loop in Linked List", "Medium", "https://leetcode.com/problems/linked-list-cycle/description/"],
  ["Linked List", "Remove loop in Linked List", "Medium", "https://leetcode.com/problems/linked-list-cycle-ii/description/"],
  ["Linked List", "Flattening a Linked List", "Medium", "https://leetcode.com/problems/flatten-a-multilevel-doubly-linked-list/description/"],
  ["Linked List", "Merge two Sorted Linked Lists", "Medium", "https://leetcode.com/problems/merge-two-sorted-lists/description/"],
  ["Linked List", "Add Two Numbers Represented as Linked List", "Medium", "https://leetcode.com/problems/add-two-numbers/description/"],
  ["Linked List", "Palindrome Linked List", "Medium", "https://leetcode.com/problems/palindrome-linked-list/description/"],
  ["Linked List", "Linked List Group Reverse", "Hard", "https://leetcode.com/problems/reverse-nodes-in-k-group/description/"],
  ["Linked List", "Clone a Linked List with Next and Random Pointer", "Hard", "https://leetcode.com/problems/copy-list-with-random-pointer/description/"],
  ["Linked List", "LRU Cache", "Hard", "https://leetcode.com/problems/lru-cache/description/"]
];

// Binary Tree
const binaryTree = [
  ["Binary Tree", "Important Traversal", "Easy", "https://leetcode.com/problems/binary-tree-preorder-traversal/description/"],
  ["Binary Tree", "Level Order Traversal in Spiral Form", "Easy", "https://leetcode.com/problems/binary-tree-zigzag-level-order-traversal/description/"],
  ["Binary Tree", "Height of Binary Tree", "Easy", "https://leetcode.com/problems/maximum-depth-of-binary-tree/description/"],
  ["Binary Tree", "Balanced Tree Check", "Easy", "https://leetcode.com/problems/balanced-binary-tree/description/"],
  ["Binary Tree", "Check Symmetric Tree", "Easy", "https://leetcode.com/problems/symmetric-tree/description/"],
  ["Binary Tree", "Check Identical Trees", "Easy", "https://leetcode.com/problems/same-tree/description/"],
  ["Binary Tree", "Left View of Binary Tree", "Easy", "https://leetcode.com/problems/binary-tree-right-side-view/description/"],
  ["Binary Tree", "Top View of Binary Tree", "Medium", "https://leetcode.com/problems/binary-tree-top-view/description/"],
  ["Binary Tree", "Bottom View of Binary Tree", "Medium", "https://leetcode.com/problems/binary-tree-bottom-view/description/"],
  ["Binary Tree", "Diagonal Tree Traversal", "Medium", "https://leetcode.com/problems/diagonal-traverse/description/"],
  ["Binary Tree", "Vertical Tree Traversal", "Medium", "https://leetcode.com/problems/vertical-order-traversal-of-a-binary-tree/description/"],
  ["Binary Tree", "LCA in Binary Tree", "Medium", "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/description/"],
  ["Binary Tree", "Tree Boundary Traversal", "Medium", "https://leetcode.com/problems/boundary-of-binary-tree/description/"],
  ["Binary Tree", "Diameter of a Binary Tree", "Medium", "https://leetcode.com/problems/diameter-of-binary-tree/description/"],
  ["Binary Tree", "Connect Nodes of Levels", "Medium", "https://leetcode.com/problems/populating-next-right-pointers-in-each-node/description/"],
  ["Binary Tree", "Serialize and Deserialize a Binary Tree", "Medium", "https://leetcode.com/problems/serialize-and-deserialize-binary-tree/description/"],
  ["Binary Tree", "Construct Tree from Inorder & Preorder", "Medium", "https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/description/"],
  ["Binary Tree", "Maximum Path Sum between 2 Nodes", "Medium", "https://leetcode.com/problems/binary-tree-maximum-path-sum/description/"],
  ["Binary Tree", "Max Path Sum between 2 Leaf Nodes", "Hard", "https://leetcode.com/problems/binary-tree-maximum-path-sum/description/"],
  ["Binary Tree", "Convert Binary Tree to Doubly Linked List", "Hard", "https://leetcode.com/problems/convert-binary-search-tree-to-sorted-doubly-linked-list/description/"]
];

// Binary Search Tree
const bst = [
  ["Binary Search Tree", "Check for BST", "Easy", "https://leetcode.com/problems/validate-binary-search-tree/description/"],
  ["Binary Search Tree", "LCA in BST", "Easy", "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/description/"],
  ["Binary Search Tree", "Sorted Array to BST", "Easy", "https://leetcode.com/problems/convert-sorted-array-to-binary-search-tree/description/"],
  ["Binary Search Tree", "Kth Largest Element in BST", "Easy", "https://leetcode.com/problems/kth-largest-element-in-a-bst/description/"],
  ["Binary Search Tree", "Ceil in BST", "Medium", "https://leetcode.com/problems/search-in-a-binary-search-tree/description/"],
  ["Binary Search Tree", "Largest BST", "Medium", "https://leetcode.com/problems/largest-bst-subtree/description/"],
  ["Binary Search Tree", "Merge two BST 's", "Medium", "https://leetcode.com/problems/merge-two-binary-trees/description/"],
  ["Binary Search Tree", "Preorder to BST", "Medium", "https://leetcode.com/problems/construct-binary-search-tree-from-preorder-traversal/description/"],
  ["Binary Search Tree", "Predecessor and Successor in BST", "Medium", "https://leetcode.com/problems/inorder-successor-in-bst/description/"],
  ["Binary Search Tree", "Binary Search Tree Iterator", "Medium", "https://leetcode.com/problems/binary-search-tree-iterator/description/"],
  ["Binary Search Tree", "Delete a Node from BST", "Medium", "https://leetcode.com/problems/delete-node-in-a-bst/description/"],
  ["Binary Search Tree", "Balance a Binary Search Tree", "Medium", "https://leetcode.com/problems/balance-a-binary-search-tree/description/"]
];

// Greedy
const greedy = [
  ["Greedy", "Minimize the Sum of Product", "Easy", "https://www.geeksforgeeks.org/minimize-sum-product-two-arrays-permutations-allowed/"],
  ["Greedy", "Largest Number Possible", "Easy", "https://leetcode.com/problems/largest-number/description/"],
  ["Greedy", "Minimum Number of Coins", "Easy", "https://www.geeksforgeeks.org/find-minimum-number-of-coins-that-make-a-change/"],
  ["Greedy", "Assign Cookies", "Easy", "https://leetcode.com/problems/assign-cookies/description/"],
  ["Greedy", "Gas Station", "Medium", "https://leetcode.com/problems/gas-station/description/"],
  ["Greedy", "Activity Selection", "Medium", "https://www.geeksforgeeks.org/activity-selection-problem-greedy-algo-1/"],
  ["Greedy", "Fractional Knapsack", "Medium", "https://www.geeksforgeeks.org/fractional-knapsack-problem/"],
  ["Greedy", "Job Sequencing", "Medium", "https://www.geeksforgeeks.org/job-sequencing-problem/"],
  ["Greedy", "Huffman Encoding", "Hard", "https://www.geeksforgeeks.org/huffman-coding-greedy-algo-3/"]
];

// Dynamic Programming
const dp = [
  ["Dynamic Programming", "Ways to Reach the Nth Stair", "Medium", "https://leetcode.com/problems/climbing-stairs/description/"],
  ["Dynamic Programming", "House Robber II", "Medium", "https://leetcode.com/problems/house-robber-ii/description/"],
  ["Dynamic Programming", "Coin Change (Minimum Coins)", "Medium", "https://leetcode.com/problems/coin-change/description/"],
  ["Dynamic Programming", "Coin Change (Count Ways)", "Medium", "https://leetcode.com/problems/coin-change-ii/description/"],
  ["Dynamic Programming", "Longest Common Substring", "Medium", "https://www.geeksforgeeks.org/longest-common-substring-dp-29/"],
  ["Dynamic Programming", "Longest Increasing Subsequence", "Medium", "https://leetcode.com/problems/longest-increasing-subsequence/description/"],
  ["Dynamic Programming", "Longest Common Subsequence", "Medium", "https://leetcode.com/problems/longest-common-subsequence/description/"],
  ["Dynamic Programming", "0 – 1 Knapsack Problem", "Medium", "https://www.geeksforgeeks.org/0-1-knapsack-problem-dp-10/"],
  ["Dynamic Programming", "Partition Equal Subset Sum", "Medium", "https://leetcode.com/problems/partition-equal-subset-sum/description/"],
  ["Dynamic Programming", "Minimum Insertions to Form Palindrome", "Medium", "https://leetcode.com/problems/minimum-insertion-steps-to-make-a-string-palindrome/description/"],
  ["Dynamic Programming", "Maximize The Cut Segments", "Medium", "https://www.geeksforgeeks.org/maximize-the-number-of-segments-of-length-p-q-and-r/"],
  ["Dynamic Programming", "Maximum Path Sum in Matrix", "Medium", "https://leetcode.com/problems/minimum-path-sum/description/"],
  ["Dynamic Programming", "Rod Cutting", "Medium", "https://www.geeksforgeeks.org/cutting-a-rod-dp-13/"],
  ["Dynamic Programming", "Egg Dropping Puzzle", "Medium", "https://leetcode.com/problems/super-egg-drop/description/"],
  ["Dynamic Programming", "Word Break", "Medium", "https://leetcode.com/problems/word-break/description/"],
  ["Dynamic Programming", "Optimal Strategy For A Game", "Medium", "https://www.geeksforgeeks.org/optimal-strategy-for-a-game-dp-31/"],
  ["Dynamic Programming", "Wildcard Pattern Matching", "Medium", "https://leetcode.com/problems/wildcard-matching/description/"],
  ["Dynamic Programming", "Edit Distance", "Medium", "https://leetcode.com/problems/edit-distance/description/"],
  ["Dynamic Programming", "Matrix Chain Multiplication", "Hard", "https://www.geeksforgeeks.org/matrix-chain-multiplication-dp-8/"],
  ["Dynamic Programming", "Palindromic Partitioning", "Hard", "https://leetcode.com/problems/palindrome-partitioning-ii/description/"],
  ["Dynamic Programming", "Boolean Parenthesization", "Hard", "https://www.geeksforgeeks.org/boolean-parenthesization-problem-dp-37/"]
];

// Graph
const graph = [
  ["Graph", "DFS of Graph", "Easy", "https://leetcode.com/problems/number-of-islands/description/"],
  ["Graph", "BFS of Graph", "Easy", "https://leetcode.com/problems/number-of-islands/description/"],
  ["Graph", "Detect Cycle in Undirected Graph", "Medium", "https://leetcode.com/problems/course-schedule/description/"],
  ["Graph", "Detect Cycle in a Directed Graph", "Medium", "https://leetcode.com/problems/course-schedule/description/"],
  ["Graph", "Detect a Negative Cycle", "Medium", "https://leetcode.com/problems/find-the-city-with-the-smallest-number-of-neighbors-at-a-threshold-distance/description/"],
  ["Graph", "Topological Sorting", "Medium", "https://leetcode.com/problems/course-schedule-ii/description/"],
  ["Graph", "Shortest Path in Directed Acyclic Graph", "Medium", "https://leetcode.com/problems/network-delay-time/description/"],
  ["Graph", "Kahn's Algorithm", "Medium", "https://leetcode.com/problems/course-schedule-ii/description/"],
  ["Graph", "Dijkstra Algorithm", "Medium", "https://leetcode.com/problems/network-delay-time/description/"],
  ["Graph", "Bellman-Ford Algorithm", "Medium", "https://leetcode.com/problems/network-delay-time/description/"],
  ["Graph", "Floyd Warshall Algorithm", "Medium", "https://leetcode.com/problems/find-the-city-with-the-smallest-number-of-neighbors-at-a-threshold-distance/description/"],
  ["Graph", "Prim's Algorithm", "Medium", "https://leetcode.com/problems/min-cost-to-connect-all-points/description/"],
  ["Graph", "Kruskal's Algorithm", "Medium", "https://leetcode.com/problems/min-cost-to-connect-all-points/description/"],
  ["Graph", "Euler Path and Circuit", "Medium", "https://leetcode.com/problems/reconstruct-itinerary/description/"],
  ["Graph", "Hamiltonian Path and Circuit", "Medium", "https://leetcode.com/problems/shortest-path-visiting-all-nodes/description/"],
  ["Graph", "Kosaraju's Algorithm", "Hard", "https://leetcode.com/problems/critical-connections-in-a-network/description/"],
  ["Graph", "Tarjan's Algorithm", "Hard", "https://leetcode.com/problems/critical-connections-in-a-network/description/"],
  ["Graph", "Bridges in Graph", "Hard", "https://leetcode.com/problems/critical-connections-in-a-network/description/"],
  ["Graph", "Articulation Points in Graph", "Hard", "https://leetcode.com/problems/critical-connections-in-a-network/description/"],
  ["Graph", "Disjoint Set (Union Find Algorithm)", "Hard", "https://leetcode.com/problems/redundant-connection/description/"],
  ["Graph", "Mother Vertex", "Medium", "https://leetcode.com/problems/find-the-town-judge/description/"],
  ["Graph", "Rotten Oranges", "Medium", "https://leetcode.com/problems/rotting-oranges/description/"],
  ["Graph", "Flood fill Algorithm", "Medium", "https://leetcode.com/problems/flood-fill/description/"],
  ["Graph", "Replace O's with X's", "Medium", "https://leetcode.com/problems/surrounded-regions/description/"],
  ["Graph", "Steps by Knight", "Medium", "https://leetcode.com/problems/minimum-knight-moves/description/"],
  ["Graph", "Bipartite Graph", "Medium", "https://leetcode.com/problems/is-graph-bipartite/description/"],
  ["Graph", "Number of Islands", "Medium", "https://leetcode.com/problems/number-of-islands/description/"],
  ["Graph", "Clone an Undirected Graph", "Medium", "https://leetcode.com/problems/clone-graph/description/"],
  ["Graph", "M-Coloring Problem", "Medium", "https://leetcode.com/problems/possible-bipartition/description/"],
  ["Graph", "Alien Dictionary", "Hard", "https://leetcode.com/problems/alien-dictionary/description/"],
  ["Graph", "Circle of Strings", "Hard", "https://leetcode.com/problems/cracking-the-safe/description/"],
  ["Graph", "Minimum Cost Path", "Hard", "https://leetcode.com/problems/minimum-path-sum/description/"]
];

// Trie
const trie = [
  ["Trie", "Insert, Search and Delete in Trie", "Medium", "https://leetcode.com/problems/implement-trie-prefix-tree/description/"],
  ["Trie", "Longest Common Prefix of Strings", "Medium", "https://leetcode.com/problems/longest-common-prefix/description/"],
  ["Trie", "Prefix Suffix String", "Medium", "https://leetcode.com/problems/design-add-and-search-words-data-structure/description/"],
  ["Trie", "Word Break (Trie)", "Hard", "https://leetcode.com/problems/word-break-ii/description/"],
  ["Trie", "Phone Directory", "Hard", "https://leetcode.com/problems/design-search-autocomplete-system/description/"],
  ["Trie", "Maximum XOR Subarray", "Hard", "https://leetcode.com/problems/maximum-xor-of-two-numbers-in-an-array/description/"]
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

