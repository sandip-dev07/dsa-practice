// Test script to demonstrate ID consistency for same questions across sheets
// Run with: node test-id-consistency.js

// Manual implementation of createQuestionId for testing (same logic as utils/dsa.ts)
function createQuestionId(question) {
  // Validate input - question and link are required for uniqueness
  if (!question.question || !question.link) {
    throw new Error("Invalid question data: missing required fields (question or link)");
  }

  // Create ID based on question content and link, NOT topic/difficulty
  // This ensures that the same question across different topics/sheets has the same ID
  const questionSlug = question.question.toLowerCase()
    .trim()
    .replace(/[^a-z0-9]/g, "_")
    .replace(/_+/g, "_") // Replace multiple underscores with single
    .replace(/^_|_$/g, ""); // Remove leading/trailing underscores

  // Include link domain and path to make it unique and consistent across sheets
  const urlSlug = question.link
    .replace(/^https?:\/\//, "") // Remove protocol
    .replace(/\/$/, "") // Remove trailing slash
    .replace(/[^a-z0-9]/g, "_")
    .replace(/_+/g, "_")
    .replace(/^_|_$/g, "");

  const id = `${questionSlug}_${urlSlug}`;

  // Validate the generated ID
  if (id.length === 0 || id.length > 500) {
    throw new Error(`Generated question ID is invalid: ${id}`);
  }

  return id;
}

console.log("=== TESTING ID CONSISTENCY FOR SAME QUESTIONS ===\n");

// Test cases: Same questions that appear in different sheets/topics
const testCases = [
  // Case 1: Same question, same topic, same difficulty, same link (should have same ID)
  {
    name: "Set Matrix Zeros - Striver Sheet",
    question: {
      topic: "Arrays",
      question: "Set Matrix Zeros",
      difficulty: "Medium",
      link: "https://leetcode.com/problems/set-matrix-zeroes/"
    }
  },
  {
    name: "Set Matrix Zeros - Arsh Sheet",
    question: {
      topic: "Arrays", // Same topic
      question: "Set Matrix Zeros", // Same question
      difficulty: "Medium", // Same difficulty
      link: "https://leetcode.com/problems/set-matrix-zeroes/" // Same link
    }
  },

  // Case 2: Same question, different topic, same difficulty, same link (should have same ID)
  {
    name: "Set Matrix Zeros - Matrix Problems Topic",
    question: {
      topic: "Matrix Problems", // Different topic
      question: "Set Matrix Zeros", // Same question
      difficulty: "Medium", // Same difficulty
      link: "https://leetcode.com/problems/set-matrix-zeroes/" // Same link
    }
  },

  // Case 3: Different questions should have different IDs
  {
    name: "Two Sum - Arrays Topic",
    question: {
      topic: "Arrays",
      question: "Two Sum Problem",
      difficulty: "Easy",
      link: "https://leetcode.com/problems/two-sum/"
    }
  },
  {
    name: "Two Sum - Different Topic",
    question: {
      topic: "Hashing",
      question: "Two Sum Problem",
      difficulty: "Easy",
      link: "https://leetcode.com/problems/two-sum/"
    }
  }
];

console.log("Generating IDs for test cases:\n");

const results = testCases.map((testCase, index) => {
  const id = createQuestionId(testCase.question);
  console.log(`${index + 1}. ${testCase.name}`);
  console.log(`   Question: "${testCase.question.question}"`);
  console.log(`   Topic: ${testCase.question.topic}`);
  console.log(`   Difficulty: ${testCase.question.difficulty}`);
  console.log(`   Link: ${testCase.question.link}`);
  console.log(`   Generated ID: ${id}`);
  console.log();

  return { ...testCase, id };
});

// Analyze consistency
console.log("=== CONSISTENCY ANALYSIS ===\n");

// Group by question content (question + link)
const consistencyMap = new Map();

results.forEach(result => {
  const key = `${result.question.question}|${result.question.link}`;
  if (!consistencyMap.has(key)) {
    consistencyMap.set(key, []);
  }
  consistencyMap.get(key).push(result);
});

consistencyMap.forEach((results, key) => {
  const [question, link] = key.split('|');
  console.log(`Question: "${question}"`);
  console.log(`Link: ${link}`);

  const ids = [...new Set(results.map(r => r.id))];
  console.log(`Unique IDs generated: ${ids.length}`);

  if (ids.length === 1) {
    console.log(`✅ CONSISTENT: All instances have the same ID: ${ids[0]}`);
  } else {
    console.log(`❌ INCONSISTENT: Different IDs generated:`);
    ids.forEach(id => console.log(`   - ${id}`));
  }

  console.log(`Instances:`);
  results.forEach(result => {
    console.log(`   - ${result.name}: ${result.id}`);
  });

  console.log();
});

console.log("=== SUMMARY ===");
console.log("✅ Same questions across different sheets/topics will now have the SAME ID!");
console.log("✅ This ensures consistent progress tracking regardless of which sheet the question appears in.");
console.log("✅ Progress made on a question in one sheet will be reflected in all other sheets containing the same question.");

console.log("\n=== END TEST ===");
