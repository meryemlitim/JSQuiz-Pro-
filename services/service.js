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

    addQuizScore(user.id, score);

    console.log(user.id, score);
    

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
  
  static async addQuizScore(userId, newScore) {
    // Get current total score
    const [rows] = await db.query(
      `SELECT totalScore FROM user WHERE id = ?`,
      [userId]
    );
  
    const currentScore = rows[0]?.total_score || 0; 
  
    const updatedScore = currentScore + newScore;
  
    // Update user table
    await db.query(
      `UPDATE user SET totalScore = ? WHERE id = ?`,
      [updatedScore, userId]
    );
  }

  static async getLeaderboard() {
    try {
      const [rows] = await db.query(
        `SELECT name, totalScore 
        FROM user 
        WHERE role != 'admin' 
        ORDER BY totalScore DESC 
        LIMIT 5`
      );
      return rows;
    } catch (err) {
      console.error("Error fetching leaderboard:", err);
      throw err;
    }
  }

  static async getUserStats(userId) {
    try {
      // Get total quizzes and total score
      const [rows] = await db.query(
        `SELECT 
          COUNT(*) AS quizzesTaken, 
          SUM(score) AS totalScore,
          AVG(score) AS avgScore
        FROM Rapport
        WHERE user_id = ?`,
        [userId]
      );

      return rows[0]; // { quizzesTaken: 3, totalScore: 75, avgScore: 25 }
    } catch (err) {
      console.error("Error fetching user stats:", err);
      throw err;
    }
  }

    static async getUserHistory(userId) {
    try {
      // Get all rapports for the user
      const [rapports] = await db.query(`
        SELECT r.id as rapportId, q.category, r.score, r.id as datePlaceholder
        FROM Rapport r
        JOIN Quiz q ON r.quiz_id = q.id
        WHERE r.user_id = ?
        ORDER BY r.id DESC
      `, [userId]);

      for (let r of rapports) {
        const [responses] = await db.query(`
          SELECT h.question_id, h.response_id, a.text AS answerText, a.status, que.text AS questionText
          FROM History h
          JOIN Answer a ON h.response_id = a.id
          JOIN Question que ON h.question_id = que.id
          WHERE h.rapport_id = ?
        `, [r.rapportId]);

        r.responses = responses.map(res => ({
          question: res.questionText,
          chosen: [res.answerText],
          correct: responses
                    .filter(x => x.question_id === res.question_id && x.status)
                    .map(x => x.answerText),
          status: res.status ? "correct" : "wrong"
        }));
      }

      return rapports;
    } catch (err) {
      console.error("getUserHistory error:", err);
      throw err;
    }
  }



}

module.exports = QuizService;
