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

    // responses should include question id and chosen ids (array of answer IDs)
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
    // console.log(result);
    return result;
  } catch (err) {
    console.error("Error inserting quiz:", err);
    throw err;
  }
}
// get questions :
async function getQuestions(){
 
try{
// const [result] = await db.query("SELECT question.id, quiz_id, text,category,user_id  FROM question JOIN quiz on question.quiz_id = quiz.id ");
const [result] = await db.query(`
  SELECT 
    qs.id AS question_id,
    qs.text AS text,
    qz.id AS quiz_id,
    qz.category,
    GROUP_CONCAT(
        CONCAT(a.id, ':', a.text, ':', a.status)
        SEPARATOR '|'
    ) AS answers
FROM Question qs
JOIN Quiz qz ON qs.quiz_id = qz.id
LEFT JOIN Answer a ON qs.id = a.question_id
GROUP BY qs.id
ORDER BY qs.id;

`);
// console.log("Questions:", result);
return result;
}catch(err){
  console.error("Failed to load questions");
}
}
// delete question :
 async function deleteQues(id){
 try {
    const [result] = await db.query("DELETE FROM question WHERE id = ?", [id]);
    return result;
  } catch (err) {
    console.error("Database error:", err);
    throw err;
  }
 }

//  create category :
async function createCategory(category, userId) {
    try {
    const [result] = await db.query(
      "INSERT INTO quiz (category, user_id) VALUES (?, ?)",
      [category, userId]
    );

  

    return result.insertId; 
  } catch (err) {
    console.error("Error inserting quiz category:", err);
    throw err;
  }
}


// edit  question

async function EditQues(questionId, quizId, questionText, answerId, answerText, status) {
   try {
    const [result] = await db.query(
      "UPDATE question SET quiz_id = ?, text = ? WHERE id = ?",
      [quizId, questionText, questionId]
    );

    for (let i = 0; i < answerText.length; i++) {
  const text = answerText[i];
  const isCorrect = status && status.includes(String(i)) ? 1 : 0;
  const id = answerId[i]
  await db.query(
    "UPDATE answer SET text = ?, status = ? where id= ?",
    [text, isCorrect, id]
  );
}
     return result;
  } catch (err) {
    console.error(err);
    res.status(500).send("Error");
  }
}

// delete question 
module.exports = {
  startQuiz,
  submitQuiz,
  createQuiz,
  getCategory,
  getQuestions,
  deleteQues,
  createCategory,
  EditQues,
};
