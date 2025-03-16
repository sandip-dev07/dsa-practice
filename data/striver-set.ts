export interface DSAQuestion {
  topic: string;
  question: string;
  difficulty: "Easy" | "Medium" | "Hard";
  link: string;
}

export const dsaQuestions: DSAQuestion[] = [
  // Day 1: Arrays
  {
    topic: "Arrays",
    question: "Set Matrix Zeros",
    difficulty: "Medium",
    link: "https://leetcode.com/problems/set-matrix-zeroes/",
  },
  {
    topic: "Arrays",
    question: "Pascal's Triangle",
    difficulty: "Medium",
    link: "https://leetcode.com/problems/pascals-triangle/",
  },
  {
    topic: "Arrays",
    question: "Next Permutation",
    difficulty: "Medium",
    link: "https://leetcode.com/problems/next-permutation/",
  },
  {
    topic: "Arrays",
    question: "Kadane's Algorithm",
    difficulty: "Easy",
    link: "https://leetcode.com/problems/maximum-subarray/",
  },
  {
    topic: "Arrays",
    question: "Sort an array of 0's, 1's and 2's",
    difficulty: "Medium",
    link: "https://leetcode.com/problems/sort-colors/",
  },
  {
    topic: "Arrays",
    question: "Stock Buy and Sell",
    difficulty: "Easy",
    link: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/",
  },

  // Day 2: Arrays Part-II
  {
    topic: "Arrays Part-II",
    question: "Rotate Matrix",
    difficulty: "Medium",
    link: "https://leetcode.com/problems/rotate-image/",
  },
  {
    topic: "Arrays Part-II",
    question: "Merge Overlapping Subintervals",
    difficulty: "Medium",
    link: "https://leetcode.com/problems/merge-intervals/",
  },
  {
    topic: "Arrays Part-II",
    question: "Merge two sorted arrays without extra space",
    difficulty: "Medium",
    link: "https://leetcode.com/problems/merge-sorted-array/",
  },
  {
    topic: "Arrays Part-II",
    question: "Find the duplicate in an array of N+1 integers",
    difficulty: "Medium",
    link: "https://leetcode.com/problems/find-the-duplicate-number/",
  },
  {
    topic: "Arrays Part-II",
    question: "Repeat and Missing Number",
    difficulty: "Hard",
    link: "https://www.interviewbit.com/problems/repeat-and-missing-number-array/",
  },
  {
    topic: "Arrays Part-II",
    question: "Inversion of Array (Pre-req: Merge Sort)",
    difficulty: "Hard",
    link: "https://www.geeksforgeeks.org/counting-inversions/",
  },

  // Day 3: Arrays Part-III
  {
    topic: "Arrays Part-III",
    question: "Search in a 2D matrix",
    difficulty: "Medium",
    link: "https://leetcode.com/problems/search-a-2d-matrix/",
  },
  {
    topic: "Arrays Part-III",
    question: "Pow(x, n)",
    difficulty: "Medium",
    link: "https://leetcode.com/problems/powx-n/",
  },
  {
    topic: "Arrays Part-III",
    question: "Majority Element (>n/2 times)",
    difficulty: "Easy",
    link: "https://leetcode.com/problems/majority-element/",
  },
  {
    topic: "Arrays Part-III",
    question: "Majority Element (n/3 times)",
    difficulty: "Medium",
    link: "https://leetcode.com/problems/majority-element-ii/",
  },
  {
    topic: "Arrays Part-III",
    question: "Grid Unique Paths",
    difficulty: "Medium",
    link: "https://leetcode.com/problems/unique-paths/",
  },
  {
    topic: "Arrays Part-III",
    question: "Reverse Pairs (Leetcode)",
    difficulty: "Hard",
    link: "https://leetcode.com/problems/reverse-pairs/",
  },

  // Day 4: Arrays Part-IV
  {
    topic: "Arrays Part-IV",
    question: "2Sum Problem",
    difficulty: "Medium",
    link: "https://leetcode.com/problems/two-sum/",
  },
  {
    topic: "Arrays Part-IV",
    question: "4-Sum Problem",
    difficulty: "Hard",
    link: "https://leetcode.com/problems/4sum/",
  },
  {
    topic: "Arrays Part-IV",
    question: "Longest Consecutive Sequence",
    difficulty: "Medium",
    link: "https://leetcode.com/problems/longest-consecutive-sequence/",
  },
  {
    topic: "Arrays Part-IV",
    question: "Largest Subarray with K sum",
    difficulty: "Medium",
    link: "https://practice.geeksforgeeks.org/problems/largest-subarray-with-0-sum/1",
  },
  {
    topic: "Arrays Part-IV",
    question: "Count number of subarrays with given xor K",
    difficulty: "Hard",
    link: "https://www.interviewbit.com/problems/subarray-with-given-xor/",
  },
  {
    topic: "Arrays Part-IV",
    question: "Longest Substring without repeat",
    difficulty: "Medium",
    link: "https://leetcode.com/problems/longest-substring-without-repeating-characters/",
  },

  // Day 5: Linked List
  {
    topic: "Linked List",
    question: "Reverse a LinkedList",
    difficulty: "Easy",
    link: "https://leetcode.com/problems/reverse-linked-list/",
  },
  {
    topic: "Linked List",
    question: "Find the middle of LinkedList",
    difficulty: "Easy",
    link: "https://leetcode.com/problems/middle-of-the-linked-list/",
  },
  {
    topic: "Linked List",
    question: "Merge two sorted Linked List",
    difficulty: "Medium",
    link: "https://leetcode.com/problems/merge-two-sorted-lists/",
  },
  {
    topic: "Linked List",
    question: "Remove N-th node from back of LinkedList",
    difficulty: "Medium",
    link: "https://leetcode.com/problems/remove-nth-node-from-end-of-list/",
  },
  {
    topic: "Linked List",
    question: "Add two numbers as LinkedList",
    difficulty: "Medium",
    link: "https://leetcode.com/problems/add-two-numbers/",
  },
  {
    topic: "Linked List",
    question: "Delete a given Node when a node is given",
    difficulty: "Medium",
    link: "https://leetcode.com/problems/delete-node-in-a-linked-list/",
  },

  // Day 6: Linked List Part-II
  {
    topic: "Linked List Part-II",
    question: "Find intersection point of Y LinkedList",
    difficulty: "Medium",
    link: "https://leetcode.com/problems/intersection-of-two-linked-lists/",
  },
  {
    topic: "Linked List Part-II",
    question: "Detect a cycle in Linked List",
    difficulty: "Medium",
    link: "https://leetcode.com/problems/linked-list-cycle/",
  },
  {
    topic: "Linked List Part-II",
    question: "Reverse a LinkedList in groups of size k",
    difficulty: "Hard",
    link: "https://leetcode.com/problems/reverse-nodes-in-k-group/",
  },
  {
    topic: "Linked List Part-II",
    question: "Check if a LinkedList is palindrome or not",
    difficulty: "Medium",
    link: "https://leetcode.com/problems/palindrome-linked-list/",
  },
  {
    topic: "Linked List Part-II",
    question: "Find the starting point of the Loop of LinkedList",
    difficulty: "Medium",
    link: "https://leetcode.com/problems/linked-list-cycle-ii/",
  },
  {
    topic: "Linked List Part-II",
    question: "Flattening of a LinkedList",
    difficulty: "Hard",
    link: "https://practice.geeksforgeeks.org/problems/flattening-a-linked-list/1",
  },

  // Day 7: Linked List and Arrays
  {
    topic: "Linked List and Arrays",
    question: "Rotate a LinkedList",
    difficulty: "Medium",
    link: "https://leetcode.com/problems/rotate-list/",
  },
  {
    topic: "Linked List and Arrays",
    question: "Clone a Linked List with random and next pointer",
    difficulty: "Hard",
    link: "https://leetcode.com/problems/copy-list-with-random-pointer/",
  },
  {
    topic: "Linked List and Arrays",
    question: "3 sum",
    difficulty: "Medium",
    link: "https://leetcode.com/problems/3sum/",
  },
  {
    topic: "Linked List and Arrays",
    question: "Trapping Rainwater",
    difficulty: "Hard",
    link: "https://leetcode.com/problems/trapping-rain-water/",
  },
  {
    topic: "Linked List and Arrays",
    question: "Remove Duplicate from Sorted array",
    difficulty: "Easy",
    link: "https://leetcode.com/problems/remove-duplicates-from-sorted-array/",
  },
  {
    topic: "Linked List and Arrays",
    question: "Max consecutive ones",
    difficulty: "Easy",
    link: "https://leetcode.com/problems/max-consecutive-ones/",
  },

  // Day 8: Greedy Algorithm
  {
    topic: "Greedy Algorithm",
    question: "N meetings in one room",
    difficulty: "Medium",
    link: "https://practice.geeksforgeeks.org/problems/n-meetings-in-one-room-1587115620/1",
  },
  {
    topic: "Greedy Algorithm",
    question: "Minimum number of platforms required for a railway",
    difficulty: "Medium",
    link: "https://practice.geeksforgeeks.org/problems/minimum-platforms-1587115620/1",
  },
  {
    topic: "Greedy Algorithm",
    question: "Job sequencing Problem",
    difficulty: "Medium",
    link: "https://practice.geeksforgeeks.org/problems/job-sequencing-problem-1587115620/1",
  },
  {
    topic: "Greedy Algorithm",
    question: "Fractional Knapsack Problem",
    difficulty: "Medium",
    link: "https://practice.geeksforgeeks.org/problems/fractional-knapsack-1587115620/1",
  },
  {
    topic: "Greedy Algorithm",
    question: "Greedy algorithm to find minimum number of coins",
    difficulty: "Medium",
    link: "https://practice.geeksforgeeks.org/problems/coin-piles/0",
  },
  {
    topic: "Greedy Algorithm",
    question: "Assign Cookies",
    difficulty: "Medium",
    link: "https://leetcode.com/problems/assign-cookies/",
  },

  // Day 9: Recursion
  {
    topic: "Recursion",
    question: "Subset Sums",
    difficulty: "Medium",
    link: "https://practice.geeksforgeeks.org/problems/subset-sums2234/1",
  },
  {
    topic: "Recursion",
    question: "Subset-II",
    difficulty: "Medium",
    link: "https://leetcode.com/problems/subsets-ii/",
  },
  {
    topic: "Recursion",
    question: "Combination sum-1",
    difficulty: "Medium",
    link: "https://leetcode.com/problems/combination-sum/",
  },
  {
    topic: "Recursion",
    question: "Combination sum-2",
    difficulty: "Medium",
    link: "https://leetcode.com/problems/combination-sum-ii/",
  },
  {
    topic: "Recursion",
    question: "Palindrome Partitioning",
    difficulty: "Medium",
    link: "https://leetcode.com/problems/palindrome-partitioning/",
  },
  {
    topic: "Recursion",
    question: "K-th permutation Sequence",
    difficulty: "Hard",
    link: "https://leetcode.com/problems/permutation-sequence/",
  },

  // Day 10: Recursion and Backtracking
  {
    topic: "Recursion and Backtracking",
    question: "Print all permutations of a string/array",
    difficulty: "Medium",
    link: "https://leetcode.com/problems/permutations/",
  },
  {
    topic: "Recursion and Backtracking",
    question: "N queens Problem",
    difficulty: "Hard",
    link: "https://leetcode.com/problems/n-queens/",
  },
  {
    topic: "Recursion and Backtracking",
    question: "Sudoko Solver",
    difficulty: "Hard",
    link: "https://leetcode.com/problems/sudoku-solver/",
  },
  {
    topic: "Recursion and Backtracking",
    question: "M Coloring Problem",
    difficulty: "Hard",
    link: "https://practice.geeksforgeeks.org/problems/m-coloring-problem-1587115620/1",
  },
  {
    topic: "Recursion and Backtracking",
    question: "Rat in a Maze",
    difficulty: "Hard",
    link: "https://practice.geeksforgeeks.org/problems/rat-in-a-maze-problem/1",
  },
  {
    topic: "Recursion and Backtracking",
    question: "Word Break (print all ways)",
    difficulty: "Medium",
    link: "https://leetcode.com/problems/word-break-ii/",
  },

  // Day 11: Binary Search
  {
    topic: "Binary Search",
    question: "The N-th root of an integer",
    difficulty: "Easy",
    link: "https://www.geeksforgeeks.org/n-th-root-number/",
  },
  {
    topic: "Binary Search",
    question: "Matrix Median",
    difficulty: "Hard",
    link: "https://www.interviewbit.com/problems/matrix-median/",
  },
  {
    topic: "Binary Search",
    question: "Find the element that appears once in a sorted array",
    difficulty: "Medium",
    link: "https://leetcode.com/problems/single-element-in-a-sorted-array/",
  },
  {
    topic: "Binary Search",
    question: "Search element in a sorted and rotated array",
    difficulty: "Medium",
    link: "https://leetcode.com/problems/search-in-rotated-sorted-array/",
  },
  {
    topic: "Binary Search",
    question: "Median of 2 sorted arrays",
    difficulty: "Hard",
    link: "https://leetcode.com/problems/median-of-two-sorted-arrays/",
  },
  {
    topic: "Binary Search",
    question: "K-th element of two sorted arrays",
    difficulty: "Medium",
    link: "https://practice.geeksforgeeks.org/problems/k-th-element-of-two-sorted-array1317/1",
  },
  {
    topic: "Binary Search",
    question: "Allocate Minimum Number of Pages",
    difficulty: "Hard",
    link: "https://practice.geeksforgeeks.org/problems/allocate-minimum-number-of-pages0937/1",
  },
  {
    topic: "Binary Search",
    question: "Aggressive Cows",
    difficulty: "Hard",
    link: "https://www.spoj.com/problems/AGGRCOW/",
  },

  // Day 12: Heaps
  {
    topic: "Heaps",
    question: "Max heap, Min Heap Implementation",
    difficulty: "Medium",
    link: "https://www.geeksforgeeks.org/building-heap-from-array/",
  },
  {
    topic: "Heaps",
    question: "Kth Largest Element",
    difficulty: "Easy",
    link: "https://leetcode.com/problems/kth-largest-element-in-an-array/",
  },
  {
    topic: "Heaps",
    question: "Maximum Sum Combination",
    difficulty: "Medium",
    link: "https://www.interviewbit.com/problems/maximum-sum-combinations/",
  },
  {
    topic: "Heaps",
    question: "Find Median from Data Stream",
    difficulty: "Hard",
    link: "https://leetcode.com/problems/find-median-from-data-stream/",
  },
  {
    topic: "Heaps",
    question: "Merge K sorted arrays",
    difficulty: "Medium",
    link: "https://practice.geeksforgeeks.org/problems/merge-k-sorted-arrays/1",
  },
  {
    topic: "Heaps",
    question: "K most frequent elements",
    difficulty: "Medium",
    link: "https://leetcode.com/problems/top-k-frequent-elements/",
  },

  // Day 13: Stack and Queue
  {
    topic: "Stack and Queue",
    question: "Implement Stack using Arrays",
    difficulty: "Easy",
    link: "https://www.geeksforgeeks.org/stack-data-structure-introduction-program/",
  },
  {
    topic: "Stack and Queue",
    question: "Implement Queue using Arrays",
    difficulty: "Easy",
    link: "https://www.geeksforgeeks.org/queue-set-1introduction-and-array-implementation/",
  },
  {
    topic: "Stack and Queue",
    question: "Implement Stack using Queue",
    difficulty: "Medium",
    link: "https://leetcode.com/problems/implement-stack-using-queues/",
  },
  {
    topic: "Stack and Queue",
    question: "Implement Queue using Stack",
    difficulty: "Medium",
    link: "https://leetcode.com/problems/implement-queue-using-stacks/",
  },
  {
    topic: "Stack and Queue",
    question: "Check for balanced parentheses",
    difficulty: "Medium",
    link: "https://leetcode.com/problems/valid-parentheses/",
  },
  {
    topic: "Stack and Queue",
    question: "Next Greater Element",
    difficulty: "Easy",
    link: "https://leetcode.com/problems/next-greater-element-i/",
  },
  {
    topic: "Stack and Queue",
    question: "Sort a Stack",
    difficulty: "Easy",
    link: "https://practice.geeksforgeeks.org/problems/sort-a-stack/1",
  },

  // Day 14: Stack and Queue Part-II
  {
    topic: "Stack and Queue Part-II",
    question: "Next Smaller Element",
    difficulty: "Easy",
    link: "https://www.interviewbit.com/problems/nearest-smaller-element/",
  },
  {
    topic: "Stack and Queue Part-II",
    question: "LRU cache",
    difficulty: "Hard",
    link: "https://leetcode.com/problems/lru-cache/",
  },
  {
    topic: "Stack and Queue Part-II",
    question: "LFU cache",
    difficulty: "Hard",
    link: "https://leetcode.com/problems/lfu-cache/",
  },
  {
    topic: "Stack and Queue Part-II",
    question: "Largest rectangle in a histogram",
    difficulty: "Medium",
    link: "https://leetcode.com/problems/largest-rectangle-in-histogram/",
  },
  {
    topic: "Stack and Queue Part-II",
    question: "Sliding Window maximum",
    difficulty: "Hard",
    link: "https://leetcode.com/problems/sliding-window-maximum/",
  },
  {
    topic: "Stack and Queue Part-II",
    question: "Implement Min Stack",
    difficulty: "Medium",
    link: "https://leetcode.com/problems/min-stack/",
  },
  {
    topic: "Stack and Queue Part-II",
    question: "Rotten Orange (Using BFS)",
    difficulty: "Medium",
    link: "https://leetcode.com/problems/rotting-oranges/",
  },
  {
    topic: "Stack and Queue Part-II",
    question: "Stock span problem",
    difficulty: "Medium",
    link: "https://leetcode.com/problems/online-stock-span/",
  },
  {
    topic: "Stack and Queue Part-II",
    question: "Find the maximum of minimums of every window size",
    difficulty: "Medium",
    link: "https://www.geeksforgeeks.org/find-the-maximum-of-minimums-for-every-window-size-in-a-given-array/",
  },
  {
    topic: "Stack and Queue Part-II",
    question: "The Celebrity Problem",
    difficulty: "Hard",
    link: "https://leetcode.com/problems/find-the-celebrity/",
  },

  // Day 15: String
  {
    topic: "String",
    question: "Reverse Words in a String",
    difficulty: "Easy",
    link: "https://leetcode.com/problems/reverse-words-in-a-string/",
  },
  {
    topic: "String",
    question: "Longest Palindrome in a string",
    difficulty: "Medium",
    link: "https://leetcode.com/problems/longest-palindromic-substring/",
  },
  {
    topic: "String",
    question: "Roman Number to Integer and vice versa",
    difficulty: "Easy",
    link: "https://leetcode.com/problems/roman-to-integer/",
  },
  {
    topic: "String",
    question: "Implement ATOI/STRSTR",
    difficulty: "Medium",
    link: "https://leetcode.com/problems/string-to-integer-atoi/",
  },
  {
    topic: "String",
    question: "Longest Common Prefix",
    difficulty: "Easy",
    link: "https://leetcode.com/problems/longest-common-prefix/",
  },
  {
    topic: "String",
    question: "Rabin Karp",
    difficulty: "Hard",
    link: "https://leetcode.com/problems/repeated-string-match/",
  },

  // Day 16: String Part-II
  {
    topic: "String Part-II",
    question: "Z-Function",
    difficulty: "Easy",
    link: "https://leetcode.com/problems/implement-strstr/",
  },
  {
    topic: "String Part-II",
    question: "KMP algo / LPS(pi) array",
    difficulty: "Hard",
    link: "https://leetcode.com/problems/implement-strstr/",
  },
  {
    topic: "String Part-II",
    question:
      "Minimum characters needed to be inserted in the beginning to make it palindromic",
    difficulty: "Hard",
    link: "https://www.interviewbit.com/problems/minimum-characters-required-to-make-a-string-palindromic/",
  },
  {
    topic: "String Part-II",
    question: "Check for Anagrams",
    difficulty: "Easy",
    link: "https://leetcode.com/problems/valid-anagram/",
  },
  {
    topic: "String Part-II",
    question: "Count and say",
    difficulty: "Medium",
    link: "https://leetcode.com/problems/count-and-say/",
  },
  {
    topic: "String Part-II",
    question: "Compare version numbers",
    difficulty: "Medium",
    link: "https://leetcode.com/problems/compare-version-numbers/",
  },

  // Day 17: Binary Tree
  {
    topic: "Binary Tree",
    question: "Inorder Traversal",
    difficulty: "Easy",
    link: "https://leetcode.com/problems/binary-tree-inorder-traversal/",
  },
  {
    topic: "Binary Tree",
    question: "Preorder Traversal",
    difficulty: "Easy",
    link: "https://leetcode.com/problems/binary-tree-preorder-traversal/",
  },
  {
    topic: "Binary Tree",
    question: "Postorder Traversal",
    difficulty: "Easy",
    link: "https://leetcode.com/problems/binary-tree-postorder-traversal/",
  },
  {
    topic: "Binary Tree",
    question: "Morris Inorder Traversal",
    difficulty: "Medium",
    link: "https://leetcode.com/problems/binary-tree-inorder-traversal/",
  },
  {
    topic: "Binary Tree",
    question: "Morris Preorder Traversal",
    difficulty: "Medium",
    link: "https://leetcode.com/problems/binary-tree-preorder-traversal/",
  },
  {
    topic: "Binary Tree",
    question: "LeftView Of Binary Tree",
    difficulty: "Easy",
    link: "https://practice.geeksforgeeks.org/problems/left-view-of-binary-tree/1",
  },
  {
    topic: "Binary Tree",
    question: "Bottom View of Binary Tree",
    difficulty: "Medium",
    link: "https://practice.geeksforgeeks.org/problems/bottom-view-of-binary-tree/1",
  },
  {
    topic: "Binary Tree",
    question: "Top View of Binary Tree",
    difficulty: "Easy",
    link: "https://practice.geeksforgeeks.org/problems/top-view-of-binary-tree/1",
  },
  {
    topic: "Binary Tree",
    question: "Preorder inorder postorder in a single traversal",
    difficulty: "Medium",
    link: "https://www.codingninjas.com/codestudio/problems/981269",
  },
  {
    topic: "Binary Tree",
    question: "Vertical order traversal",
    difficulty: "Easy",
    link: "https://leetcode.com/problems/vertical-order-traversal-of-a-binary-tree/",
  },
  {
    topic: "Binary Tree",
    question: "Root to Node Path in Binary Tree",
    difficulty: "Medium",
    link: "https://www.interviewbit.com/problems/path-to-given-node/",
  },
  {
    topic: "Binary Tree",
    question: "Max width of a Binary Tree",
    difficulty: "Medium",
    link: "https://leetcode.com/problems/maximum-width-of-binary-tree/",
  },

  // Day 18: Binary Tree part-II
  {
    topic: "Binary Tree part-II",
    question: "Level order Traversal / Level order traversal in spiral form",
    difficulty: "Easy",
    link: "https://leetcode.com/problems/binary-tree-level-order-traversal/",
  },
  {
    topic: "Binary Tree part-II",
    question: "Height of a Binary Tree",
    difficulty: "Medium",
    link: "https://leetcode.com/problems/maximum-depth-of-binary-tree/",
  },
  {
    topic: "Binary Tree part-II",
    question: "Diameter of Binary Tree",
    difficulty: "Medium",
    link: "https://leetcode.com/problems/diameter-of-binary-tree/",
  },
  {
    topic: "Binary Tree part-II",
    question: "Check if the Binary tree is height-balanced or not",
    difficulty: "Medium",
    link: "https://leetcode.com/problems/balanced-binary-tree/",
  },
  {
    topic: "Binary Tree part-II",
    question: "LCA in Binary Tree",
    difficulty: "Medium",
    link: "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/",
  },
  {
    topic: "Binary Tree part-II",
    question: "Check if two trees are identical or not",
    difficulty: "Medium",
    link: "https://leetcode.com/problems/same-tree/",
  },
  {
    topic: "Binary Tree part-II",
    question: "Zig Zag Traversal of Binary Tree",
    difficulty: "Easy",
    link: "https://leetcode.com/problems/binary-tree-zigzag-level-order-traversal/",
  },
  {
    topic: "Binary Tree part-II",
    question: "Boundary Traversal of Binary Tree",
    difficulty: "Medium",
    link: "https://practice.geeksforgeeks.org/problems/boundary-traversal-of-binary-tree/1",
  },

  // Day 19: Binary Tree part-III
  {
    topic: "Binary Tree part-III",
    question: "Maximum path sum",
    difficulty: "Hard",
    link: "https://leetcode.com/problems/binary-tree-maximum-path-sum/",
  },
  {
    topic: "Binary Tree part-III",
    question: "Construct Binary Tree from inorder and preorder",
    difficulty: "Hard",
    link: "https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/",
  },
  {
    topic: "Binary Tree part-III",
    question: "Construct Binary Tree from Inorder and Postorder",
    difficulty: "Hard",
    link: "https://leetcode.com/problems/construct-binary-tree-from-inorder-and-postorder-traversal/",
  },
  {
    topic: "Binary Tree part-III",
    question: "Symmetric Binary Tree",
    difficulty: "Medium",
    link: "https://leetcode.com/problems/symmetric-tree/",
  },
  {
    topic: "Binary Tree part-III",
    question: "Flatten Binary Tree to LinkedList",
    difficulty: "Hard",
    link: "https://leetcode.com/problems/flatten-binary-tree-to-linked-list/",
  },
  {
    topic: "Binary Tree part-III",
    question: "Check if Binary Tree is the mirror of itself or not",
    difficulty: "Medium",
    link: "https://practice.geeksforgeeks.org/problems/mirror-tree/1",
  },
  {
    topic: "Binary Tree part-III",
    question: "Check for Children Sum Property",
    difficulty: "Hard",
    link: "https://practice.geeksforgeeks.org/problems/children-sum-parent/1",
  },

  // Day 20: Binary Search Tree
  {
    topic: "Binary Search Tree",
    question: "Populate Next Right pointers of Tree",
    difficulty: "Medium",
    link: "https://leetcode.com/problems/populating-next-right-pointers-in-each-node/",
  },
  {
    topic: "Binary Search Tree",
    question: "Search given Key in BST",
    difficulty: "Easy",
    link: "https://leetcode.com/problems/search-in-a-binary-search-tree/",
  },
  {
    topic: "Binary Search Tree",
    question: "Construct BST from given keys",
    difficulty: "Hard",
    link: "https://leetcode.com/problems/convert-sorted-array-to-binary-search-tree/",
  },
  {
    topic: "Binary Search Tree",
    question: "Construct a BST from a preorder traversal",
    difficulty: "Medium",
    link: "https://leetcode.com/problems/construct-binary-search-tree-from-preorder-traversal/",
  },
  {
    topic: "Binary Search Tree",
    question: "Check is a BT is BST or not",
    difficulty: "Medium",
    link: "https://leetcode.com/problems/validate-binary-search-tree/",
  },
  {
    topic: "Binary Search Tree",
    question: "Find LCA of two nodes in BST",
    difficulty: "Medium",
    link: "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/",
  },
  {
    topic: "Binary Search Tree",
    question: "Find the inorder predecessor/successor of a given Key in BST",
    difficulty: "Medium",
    link: "https://practice.geeksforgeeks.org/problems/predecessor-and-successor/1",
  },

  // Day 21: Binary Search Tree Part-II
  {
    topic: "Binary Search Tree Part-II",
    question: "Floor in a BST",
    difficulty: "Easy",
    link: "https://www.geeksforgeeks.org/floor-in-binary-search-tree-bst/",
  },
  {
    topic: "Binary Search Tree Part-II",
    question: "Ceil in a BST",
    difficulty: "Easy",
    link: "https://www.geeksforgeeks.org/ceiling-in-a-binary-search-tree/",
  },
  {
    topic: "Binary Search Tree Part-II",
    question: "Find K-th smallest element in BST",
    difficulty: "Medium",
    link: "https://leetcode.com/problems/kth-smallest-element-in-a-bst/",
  },
  {
    topic: "Binary Search Tree Part-II",
    question: "Find K-th largest element in BST",
    difficulty: "Medium",
    link: "https://practice.geeksforgeeks.org/problems/kth-largest-element-in-bst/1",
  },
  {
    topic: "Binary Search Tree Part-II",
    question: "Find a pair with a given sum in BST",
    difficulty: "Medium",
    link: "https://leetcode.com/problems/two-sum-iv-input-is-a-bst/",
  },
  {
    topic: "Binary Search Tree Part-II",
    question: "BST iterator",
    difficulty: "Medium",
    link: "https://leetcode.com/problems/binary-search-tree-iterator/",
  },
  {
    topic: "Binary Search Tree Part-II",
    question: "Size of the largest BST in a Binary Tree",
    difficulty: "Medium",
    link: "https://practice.geeksforgeeks.org/problems/largest-bst/1",
  },
  {
    topic: "Binary Search Tree Part-II",
    question: "Serialize and deserialize Binary Tree",
    difficulty: "Hard",
    link: "https://leetcode.com/problems/serialize-and-deserialize-binary-tree/",
  },

  // Day 22: Binary Trees[Miscellaneous]
  {
    topic: "Binary Trees[Miscellaneous]",
    question: "Binary Tree to Double Linked List",
    difficulty: "Medium",
    link: "https://leetcode.com/problems/flatten-binary-tree-to-linked-list/",
  },
  {
    topic: "Binary Trees[Miscellaneous]",
    question: "Find median in a stream of running integers",
    difficulty: "Hard",
    link: "https://leetcode.com/problems/find-median-from-data-stream/",
  },
  {
    topic: "Binary Trees[Miscellaneous]",
    question: "K-th largest element in a stream",
    difficulty: "Easy",
    link: "https://leetcode.com/problems/kth-largest-element-in-a-stream/",
  },
  {
    topic: "Binary Trees[Miscellaneous]",
    question: "Distinct numbers in Window",
    difficulty: "Medium",
    link: "https://www.interviewbit.com/problems/distinct-numbers-in-window/",
  },
  {
    topic: "Binary Trees[Miscellaneous]",
    question: "K-th largest element in an unsorted array",
    difficulty: "Easy",
    link: "https://leetcode.com/problems/kth-largest-element-in-an-array/",
  },
  {
    topic: "Binary Trees[Miscellaneous]",
    question: "Flood-fill Algorithm",
    difficulty: "Hard",
    link: "https://leetcode.com/problems/flood-fill/",
  },

  // Day 23: Graph
  {
    topic: "Graph",
    question: "Clone a graph",
    difficulty: "Hard",
    link: "https://leetcode.com/problems/clone-graph/",
  },
  {
    topic: "Graph",
    question: "DFS",
    difficulty: "Hard",
    link: "https://practice.geeksforgeeks.org/problems/depth-first-traversal-for-a-graph/1",
  },
  {
    topic: "Graph",
    question: "BFS",
    difficulty: "Medium",
    link: "https://practice.geeksforgeeks.org/problems/bfs-traversal-of-graph/1",
  },
  {
    topic: "Graph",
    question: "Detect A cycle in Undirected Graph using BFS",
    difficulty: "Hard",
    link: "https://practice.geeksforgeeks.org/problems/detect-cycle-in-an-undirected-graph/1",
  },
  {
    topic: "Graph",
    question: "Detect A cycle in Undirected Graph using DFS",
    difficulty: "Hard",
    link: "https://practice.geeksforgeeks.org/problems/detect-cycle-in-an-undirected-graph/1",
  },
  {
    topic: "Graph",
    question: "Detect A cycle in a Directed Graph using DFS",
    difficulty: "Hard",
    link: "https://leetcode.com/problems/course-schedule/",
  },
  {
    topic: "Graph",
    question: "Detect A cycle in a Directed Graph using BFS",
    difficulty: "Hard",
    link: "https://leetcode.com/problems/course-schedule/",
  },
  {
    topic: "Graph",
    question: "Topological Sort BFS",
    difficulty: "Hard",
    link: "https://practice.geeksforgeeks.org/problems/topological-sort/1",
  },
  {
    topic: "Graph",
    question: "Topological Sort DFS",
    difficulty: "Hard",
    link: "https://practice.geeksforgeeks.org/problems/topological-sort/1",
  },
  {
    topic: "Graph",
    question: "Number of islands",
    difficulty: "Hard",
    link: "https://leetcode.com/problems/number-of-islands/",
  },
  {
    topic: "Graph",
    question: "Bipartite Check using BFS",
    difficulty: "Medium",
    link: "https://leetcode.com/problems/is-graph-bipartite/",
  },
  {
    topic: "Graph",
    question: "Bipartite Check using DFS",
    difficulty: "Medium",
    link: "https://leetcode.com/problems/is-graph-bipartite/",
  },

  // Day 24: Graph Part-II
  {
    topic: "Graph Part-II",
    question: "Strongly Connected Component(using KosaRaju's algo)",
    difficulty: "Hard",
    link: "https://leetcode.com/problems/maximum-number-of-non-overlapping-substrings/discuss/766485/kosaraju-algorithm-on",
  },
  {
    topic: "Graph Part-II",
    question: "Dijkstra's Algorithm",
    difficulty: "Hard",
    link: "https://practice.geeksforgeeks.org/problems/implementing-dijkstra-set-1-adjacency-matrix/1",
  },
  {
    topic: "Graph Part-II",
    question: "Bellman-Ford Algo",
    difficulty: "Hard",
    link: "https://practice.geeksforgeeks.org/problems/negative-weight-cycle3504/1",
  },
  {
    topic: "Graph Part-II",
    question: "Floyd Warshall Algorithm",
    difficulty: "Hard",
    link: "https://practice.geeksforgeeks.org/problems/implementing-floyd-warshall2042/1",
  },
  {
    topic: "Graph Part-II",
    question: "MST using Prim's Algo",
    difficulty: "Hard",
    link: "https://practice.geeksforgeeks.org/problems/minimum-spanning-tree/1",
  },
  {
    topic: "Graph Part-II",
    question: "MST using Kruskal's Algo",
    difficulty: "Hard",
    link: "https://practice.geeksforgeeks.org/problems/minimum-spanning-tree/1",
  },

  // Day 25: Dynamic Programming
  {
    topic: "Dynamic Programming",
    question: "Max Product Subarray",
    difficulty: "Medium",
    link: "https://leetcode.com/problems/maximum-product-subarray/",
  },
  {
    topic: "Dynamic Programming",
    question: "Longest Increasing Subsequence",
    difficulty: "Medium",
    link: "https://leetcode.com/problems/longest-increasing-subsequence/",
  },
  {
    topic: "Dynamic Programming",
    question: "Longest Common Subsequence",
    difficulty: "Medium",
    link: "https://leetcode.com/problems/longest-common-subsequence/",
  },
  {
    topic: "Dynamic Programming",
    question: "0-1 Knapsack",
    difficulty: "Medium",
    link: "https://practice.geeksforgeeks.org/problems/0-1-knapsack-problem0945/1",
  },
  {
    topic: "Dynamic Programming",
    question: "Edit Distance",
    difficulty: "Hard",
    link: "https://leetcode.com/problems/edit-distance/",
  },
  {
    topic: "Dynamic Programming",
    question: "Maximum sum increasing subsequence",
    difficulty: "Hard",
    link: "https://practice.geeksforgeeks.org/problems/maximum-sum-increasing-subsequence4749/1",
  },
  {
    topic: "Dynamic Programming",
    question: "Matrix Chain Multiplication",
    difficulty: "Hard",
    link: "https://practice.geeksforgeeks.org/problems/matrix-chain-multiplication0303/1",
  },

  // Day 26: Dynamic Programming Part-II
  {
    topic: "Dynamic Programming Part-II",
    question: "Minimum sum path in the matrix",
    difficulty: "Medium",
    link: "https://leetcode.com/problems/minimum-path-sum/",
  },
  {
    topic: "Dynamic Programming Part-II",
    question: "Coin change",
    difficulty: "Hard",
    link: "https://leetcode.com/problems/coin-change/",
  },
  {
    topic: "Dynamic Programming Part-II",
    question: "Subset Sum",
    difficulty: "Medium",
    link: "https://leetcode.com/problems/partition-equal-subset-sum/",
  },
  {
    topic: "Dynamic Programming Part-II",
    question: "Rod Cutting",
    difficulty: "Hard",
    link: "https://practice.geeksforgeeks.org/problems/rod-cutting0840/1",
  },
  {
    topic: "Dynamic Programming Part-II",
    question: "Egg Dropping",
    difficulty: "Hard",
    link: "https://leetcode.com/problems/super-egg-drop/",
  },
  {
    topic: "Dynamic Programming Part-II",
    question: "Word Break",
    difficulty: "Medium",
    link: "https://leetcode.com/problems/word-break/",
  },
  {
    topic: "Dynamic Programming Part-II",
    question: "Palindrome Partitioning (MCM Variation)",
    difficulty: "Hard",
    link: "https://leetcode.com/problems/palindrome-partitioning-ii/",
  },
  {
    topic: "Dynamic Programming Part-II",
    question: "Maximum profit in Job scheduling",
    difficulty: "Medium",
    link: "https://leetcode.com/problems/maximum-profit-in-job-scheduling/",
  },

  // Day 27: Trie
  {
    topic: "Trie",
    question: "Implement Trie (Prefix Tree)",
    difficulty: "Hard",
    link: "https://leetcode.com/problems/implement-trie-prefix-tree/",
  },
  {
    topic: "Trie",
    question: "Implement Trie - 2 (Prefix Tree)",
    difficulty: "Hard",
    link: "https://leetcode.com/problems/implement-trie-ii-prefix-tree/",
  },
  {
    topic: "Trie",
    question: "Longest String with All Prefixes",
    difficulty: "Medium",
    link: "https://www.codingninjas.com/codestudio/problems/complete-string_2687860",
  },
  {
    topic: "Trie",
    question: "Number of Distinct Substrings in a String",
    difficulty: "Hard",
    link: "https://www.codingninjas.com/codestudio/problems/count-distinct-substrings_985292",
  },
  {
    topic: "Trie",
    question: "Power Set (this is very important)",
    difficulty: "Medium",
    link: "https://leetcode.com/problems/subsets/",
  },
  {
    topic: "Trie",
    question: "Maximum XOR of two numbers in an array",
    difficulty: "Medium",
    link: "https://leetcode.com/problems/maximum-xor-of-two-numbers-in-an-array/",
  },
  {
    topic: "Trie",
    question: "Maximum XOR With an Element From Array",
    difficulty: "Hard",
    link: "https://leetcode.com/problems/maximum-xor-with-an-element-from-array/",
  },
];
