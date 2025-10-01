const db = require("./db");

class Quiz {
    static async create(category, userId) {
        const [result] = await db.query(
            "INSERT INTO Quiz (category, user_id) VALUES (?, ?)",
            [category, userId]
        );
        return { id: result.insertId, category, user_id: userId };
    }

    static async getQuestionsByCategory(category) {
        const [questions] = await db.query(
            `SELECT q.id as question_id, q.text as question_text, a.id as answer_id, a.text as answer_text, a.status
             FROM Question q
             JOIN Answer a ON q.id = a.question_id
             WHERE q.quiz_id IN (SELECT id FROM Quiz WHERE category = ?)
             ORDER BY q.id, a.id`,
            [category]
        );

        const quizData = {};
        quizData[category] = [];
        let lastQId = null;
        let currentQ = null;

        questions.forEach(row => {
            if (row.question_id !== lastQId) {
                currentQ = {
                    question: row.question_text,
                    answers: [],
                    correctAnswers: []
                };
                quizData[category].push(currentQ);
                lastQId = row.question_id;
            }

            currentQ.answers.push({ id: row.answer_id, text: row.answer_text });
            if (row.status) currentQ.correctAnswers.push(row.answer_text);
        });

        return quizData;
    }
}

module.exports = Quiz;
