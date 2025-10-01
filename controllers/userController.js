const QuizService = require("../services/service");

// Display home page
exports.index = (req, res) => {
  const user = req.session.user;

  console.log("username: " + user);
  

  if (user.role === "admin") {
    res.render("admin", { user });
  } else {
    res.render("index", { user });  
  }
};

// Display quiz page
exports.quiz = async (req, res) => {
  const username = req.query.username || "Anonymous";
  const category = req.query.category || "general";

  const questions = await QuizService.getQuestionsByCategory(category);

    res.render("quiz", { 
    username, 
    category, 
    questions: JSON.stringify(questions)
    });

};



// Handle quiz submission
exports.submitQuiz = async (req, res) => {
  try {
    const { username, category, score, totalTime, responses } = req.body;

    const finalScore = Number(score) || 0; // make sure it's not null

    const user = { id: 1, name: username }; // dummy user

    const rapportId = await QuizService.saveRapport(
      user,
      category,
      finalScore,
      totalTime,
      responses
    );

    res.render("results", {
      report: {
        name: username,
        category,
        score: finalScore,
        dateTime: new Date().toLocaleString(),
        responses
      }
    });
  } catch (err) {
    console.error(err);
    res.send("Error saving quiz: " + err.message);
  }
};

