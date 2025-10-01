const db = require("./db");

class Rapport {
    static async create(userId, quizId, score) {
        const [result] = await db.query(
            "INSERT INTO Rapport (user_id, quiz_id, score) VALUES (?, ?, ?)",
            [userId, quizId, score]
        );
        return result.insertId;
    }

    static async addHistory(rapportId, responses) {
        for (let r of responses) {
            for (let ans of r.chosenIds) {
                await db.query(
                    "INSERT INTO History (question_id, response_id, rapport_id) VALUES (?, ?, ?)",
                    [r.questionId, ans, rapportId]
                );
            }
        }
    }

    static async getById(rapportId) {
        const [rows] = await db.query(
            `SELECT r.score, r.id as rapport_id, u.name as user_name, q.category,
             qz.id as quiz_id, q.text as question_text, a.text as answer_text, a.status
             FROM Rapport r
             JOIN User u ON r.user_id = u.id
             JOIN Quiz qz ON r.quiz_id = qz.id
             JOIN History h ON h.rapport_id = r.id
             JOIN Question q ON h.question_id = q.id
             JOIN Answer a ON h.response_id = a.id
             WHERE r.id = ?`,
            [rapportId]
        );

        return rows;
    }
}

module.exports = Rapport;
