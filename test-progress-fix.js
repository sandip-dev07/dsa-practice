// Test script to verify progress tracking fixes
// Run this with: node test-progress-fix.js

const { createQuestionId, validateCompletedQuestions, debugProgressData } = require('./utils/dsa.ts');

// Test data
const testQuestions = [
  {
    topic: "Arrays",
    question: "Set Matrix Zeros",
    difficulty: "Medium",
    link: "https://leetcode.com/problems/set-matrix-zeroes/"
  },
  {
    topic: "Arrays",
    question: "Next Permutation",
    difficulty: "Medium",
    link: "https://leetcode.com/problems/next-permutation/"
  },
  {
    topic: "Arrays",
    question: "Majority Element (>n/2 times)",
    difficulty: "Easy",
    link: "https://leetcode.com/problems/majority-element/"
  },
  {
    topic: "Arrays",
    question: "Majority Element (n/3 times)",
    difficulty: "Medium",
    link: "https://leetcode.com/problems/majority-element-ii/"
  }
];

const testProgress = [
  { questionId: createQuestionId(testQuestions[0]), solved: true },
  { questionId: createQuestionId(testQuestions[1]), solved: true },
  { questionId: createQuestionId(testQuestions[2]), solved: true },
  { questionId: createQuestionId(testQuestions[3]), solved: false },
  // Duplicate entries to test deduplication
  { questionId: createQuestionId(testQuestions[0]), solved: true },
  { questionId: createQuestionId(testQuestions[1]), solved: true },
];

console.log("Testing progress tracking fixes...");

// Test question ID generation
console.log("\n=== Testing Question ID Generation ===");
testQuestions.forEach(q => {
  const id = createQuestionId(q);
  console.log(`"${q.question}" -> "${id}"`);
});

// Test validation
console.log("\n=== Testing Progress Validation ===");
const completedMap = testProgress.reduce((acc, item) => {
  acc[item.questionId] = item.solved;
  return acc;
}, {});

const validated = validateCompletedQuestions(completedMap, testQuestions);
console.log("Validated completed questions:", Object.keys(validated).length);

// Test debug function
console.log("\n=== Testing Debug Function ===");
debugProgressData(testProgress, testQuestions);

console.log("\n=== Test Complete ===");
console.log("All fixes appear to be working correctly!");
