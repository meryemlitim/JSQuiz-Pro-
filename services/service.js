const db = require("../models/db");

class QuizService {

  // Get all questions + answers by category
  static async getQuestionsByCategory(category) {
    const [quizzes] = await db.query(
      `SELECT id FROM Quiz WHERE category = ? LIMIT 1`,
      [category]
    );

    if (!quizzes.length) return [];

    const quizId = quizzes[0].id;

    const [questions] = await db.query(
      `SELECT * FROM Question WHERE quiz_id = ?`,
      [quizId]
    );

    // For each question, get answers
    const fullQuestions = [];
    for (let q of questions) {
      const [answers] = await db.query(
        `SELECT id, text, status FROM Answer WHERE question_id = ?`,
        [q.id]
      );

      fullQuestions.push({
        id: q.id,
        text: q.text,
        answers: answers.map(a => ({ id: a.id, text: a.text, status: !!a.status })),
        correct: answers.filter(a => a.status).map(a => a.text) // list of correct answers
      });
    }

    return fullQuestions;
  }

  // Save quiz attempt
  static async saveRapport(user, category, score, totalTime, responses) {
    // find quiz id
    const [quizRows] = await db.query(`SELECT id FROM Quiz WHERE category = ? LIMIT 1`, [category]);
    if (!quizRows.length) throw new Error("Quiz not found");

    const quizId = quizRows[0].id;

    // save rapport
    const [rapportRes] = await db.query(
      `INSERT INTO Rapport (user_id, quiz_id, score) VALUES (?, ?, ?)`,
      [user.id, quizId, score]
    );

    const rapportId = rapportRes.insertId;

    // save history
    for (let r of responses) {
      for (let chosen of r.chosen) {
        // find answer id
        const [ans] = await db.query(
          `SELECT id FROM Answer WHERE question_id = ? AND text = ? LIMIT 1`,
          [r.questionId, chosen]
        );
        if (ans.length) {
          await db.query(
            `INSERT INTO History (question_id, response_id, rapport_id) VALUES (?, ?, ?)`,
            [r.questionId, ans[0].id, rapportId]
          );
        }
      }
    }

    return rapportId;
  }

}

module.exports = QuizService;
