const User = require("../models/user");
const Quiz = require("../models/Quiz");
const Rapport = require("../models/Rapport");

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

module.exports = {
    startQuiz,
    submitQuiz
};
