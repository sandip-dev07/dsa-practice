// Script to analyze question duplicates across sheets and verify ID generation
// Run with: node analyze-questions.js

const fs = require('fs');
const path = require('path');

// Import the utility functions
const { createQuestionId, getQuestionContentHash, findDuplicateQuestions, analyzeQuestionDuplicates } = require('./utils/dsa.ts');

console.log("=== ANALYZING QUESTION SHEETS FOR DUPLICATES AND ID CONSISTENCY ===\n");

// Load question data from JSON files
const sheets = {};

try {
  // Load Arsh Goyel sheet
  const arshPath = path.join(__dirname, 'constants', 'arsh-goyel-sheet.json');
  if (fs.existsSync(arshPath)) {
    sheets.arsh = JSON.parse(fs.readFileSync(arshPath, 'utf8'));
    console.log(`✅ Loaded Arsh Goyel sheet: ${sheets.arsh.length} questions`);
  }

  // Load GFG sheet
  const gfgPath = path.join(__dirname, 'constants', 'gfg-dsa-sheet.json');
  if (fs.existsSync(gfgPath)) {
    sheets.gfg = JSON.parse(fs.readFileSync(gfgPath, 'utf8'));
    console.log(`✅ Loaded GFG DSA sheet: ${sheets.gfg.length} questions`);
  }

  // Load Striver sheet
  const striverPath = path.join(__dirname, 'constants', 'striver-sde-sheet.json');
  if (fs.existsSync(striverPath)) {
    sheets.striver = JSON.parse(fs.readFileSync(striverPath, 'utf8'));
    console.log(`✅ Loaded Striver SDE sheet: ${sheets.striver.length} questions`);
  }

} catch (error) {
  console.error("❌ Error loading question files:", error.message);
  process.exit(1);
}

// Add sheet property to each question
Object.keys(sheets).forEach(sheetName => {
  sheets[sheetName].forEach(q => {
    q.sheet = sheetName;
  });
});

console.log("\n=== TESTING ID GENERATION ===");

// Test ID generation for some sample questions
const testQuestions = [
  // Same question that might appear in multiple sheets
  {
    topic: "Arrays",
    question: "Set Matrix Zeros",
    difficulty: "Medium",
    link: "https://leetcode.com/problems/set-matrix-zeroes/",
    sheet: "striver"
  },
  {
    topic: "Matrix Problems", // Different topic
    question: "Set Matrix Zeros", // Same question
    difficulty: "Medium", // Same difficulty
    link: "https://leetcode.com/problems/set-matrix-zeroes/", // Same link
    sheet: "arsh"
  },
  {
    topic: "Arrays",
    question: "Two Sum Problem",
    difficulty: "Easy",
    link: "https://leetcode.com/problems/two-sum/",
    sheet: "gfg"
  },
  {
    topic: "Arrays",
    question: "Two Sum Problem", // Same question
    difficulty: "Easy", // Same difficulty
    link: "https://leetcode.com/problems/two-sum/", // Same link
    sheet: "striver"
  }
];

console.log("Testing ID generation for same questions across different sheets:");
testQuestions.forEach((q, index) => {
  const id = createQuestionId(q);
  console.log(`${index + 1}. "${q.question}" (${q.sheet} - ${q.topic})`);
  console.log(`   ID: ${id}`);
  console.log(`   Link: ${q.link}\n`);
});

// Find and display actual duplicates from the loaded data
console.log("=== ANALYZING ACTUAL QUESTION DATA ===");
const duplicates = analyzeQuestionDuplicates(sheets);

// Show some examples of ID consistency
console.log("\n=== ID CONSISTENCY EXAMPLES ===");

if (duplicates.size > 0) {
  console.log("Same questions across different sheets will now have the SAME ID:");
  let exampleCount = 0;

  duplicates.forEach((questions, hash) => {
    if (exampleCount >= 3) return; // Show only first 3 examples

    const [questionText, link] = hash.split('|');
    console.log(`\nExample ${exampleCount + 1}: "${questionText}"`);

    const ids = new Set();
    questions.forEach(q => {
      const id = createQuestionId(q);
      ids.add(id);
      console.log(`  - ${q.sheet} (${q.topic}): ${id}`);
    });

    if (ids.size === 1) {
      console.log(`  ✅ All instances have the SAME ID: ${Array.from(ids)[0]}`);
    } else {
      console.log(`  ❌ Different IDs generated: ${Array.from(ids).join(', ')}`);
    }

    exampleCount++;
  });
}

console.log("\n=== SUMMARY ===");
const totalQuestions = Object.values(sheets).reduce((sum, questions) => sum + questions.length, 0);
const uniqueQuestions = new Set();

Object.values(sheets).forEach(questions => {
  questions.forEach(q => {
    uniqueQuestions.add(getQuestionContentHash(q));
  });
});

console.log(`Total questions across all sheets: ${totalQuestions}`);
console.log(`Unique questions (by content): ${uniqueQuestions.size}`);
console.log(`Duplicate question groups: ${duplicates.size}`);

if (duplicates.size > 0) {
  console.log("\n✅ SUCCESS: Same questions across different sheets will now have consistent IDs!");
  console.log("This ensures that progress tracking works correctly regardless of which sheet the question appears in.");
} else {
  console.log("\nℹ️  No duplicate questions found across sheets.");
}

console.log("\n=== END ANALYSIS ===");
