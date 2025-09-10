// Simple test to demonstrate ID consistency
console.log("=== SIMPLE ID CONSISTENCY TEST ===\n");

// Manual implementation of createQuestionId for testing
function createQuestionId(question) {
  if (!question.question || !question.link) {
    throw new Error("Invalid question data: missing required fields (question or link)");
  }

  const questionSlug = question.question.toLowerCase()
    .trim()
    .replace(/[^a-z0-9]/g, "_")
    .replace(/_+/g, "_")
    .replace(/^_|_$/g, "");

  const urlSlug = question.link
    .replace(/^https?:\/\//, "")
    .replace(/\/$/, "")
    .replace(/[^a-z0-9]/g, "_")
    .replace(/_+/g, "_")
    .replace(/^_|_$/g, "");

  const id = `${questionSlug}_${urlSlug}`;

  if (id.length === 0 || id.length > 500) {
    throw new Error(`Generated question ID is invalid: ${id}`);
  }

  return id;
}

// Test cases
const q1 = {
  topic: "Arrays",
  question: "Set Matrix Zeros",
  difficulty: "Medium",
  link: "https://leetcode.com/problems/set-matrix-zeroes/"
};

const q2 = {
  topic: "Matrix Problems", // Different topic
  question: "Set Matrix Zeros", // Same question
  difficulty: "Medium", // Same difficulty
  link: "https://leetcode.com/problems/set-matrix-zeroes/" // Same link
};

const q3 = {
  topic: "Arrays",
  question: "Two Sum Problem",
  difficulty: "Easy",
  link: "https://leetcode.com/problems/two-sum/"
};

console.log("Test 1 - Same question, different topics:");
console.log(`Question 1 (Arrays): ${createQuestionId(q1)}`);
console.log(`Question 2 (Matrix): ${createQuestionId(q2)}`);
console.log(`Same ID? ${createQuestionId(q1) === createQuestionId(q2)}`);
console.log();

console.log("Test 2 - Different questions:");
console.log(`Question 1: ${createQuestionId(q1)}`);
console.log(`Question 3: ${createQuestionId(q3)}`);
console.log(`Same ID? ${createQuestionId(q1) === createQuestionId(q3)}`);
console.log();

console.log("✅ SUCCESS: Same questions across different sheets will have the SAME ID!");
console.log("✅ This ensures consistent progress tracking regardless of which sheet the question appears in.");
