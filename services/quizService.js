const User = require("../models/user");
const Quiz = require("../models/Quiz");
const Rapport = require("../models/Rapport");
const { quiz } = require("../controllers/userController");
const db = require("../models/db");
async function startQuiz(name, email, category) {
  const user = await User.findOrCreate(name, email);
  const quiz = await Quiz.create(category, user.id);
  const questions = await Quiz.getQuestionsByCategory(category);
  return { user, quiz, questions };
}

async function submitQuiz(userId, quizId, score, responses) {
  const rapportId = await Rapport.create(userId, quizId, score);

  // responses should include questionId and chosenIds (array of answer IDs)
  await Rapport.addHistory(rapportId, responses);

  return rapportId;
}

// admin add quiz

async function createQuiz(quizId, questionText, answerText, status) {
  try {
    const [result] = await db.query(
      "INSERT INTO question (quiz_id, text) VALUES (?, ?)",
      [quizId, questionText]
    );

    const questionId = result.insertId;

  //  const { answerText, status } = req.body;

for (let i = 0; i < answerText.length; i++) {
  const text = answerText[i];
  const isCorrect = status && status.includes(String(i)) ? 1 : 0;

  await db.query(
    "INSERT INTO answer (question_id, text, status) VALUES (?, ?, ?)",
    [questionId, text, isCorrect]
  );
}


    return result.insertId; // return new quiz ID
  } catch (err) {
    console.error("Error inserting quiz:", err);
    throw err;
  }
}

// get category :
async function getCategory() {
  try {
    const [result] = await db.query("SELECT * FROM quiz");
    console.log(result);
    return result;
  } catch (err) {
    console.error("Error inserting quiz:", err);
    throw err;
  }
}
module.exports = {
  startQuiz,
  submitQuiz,
  createQuiz,
  getCategory,
};
