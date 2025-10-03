const { createQuiz, getCategory } = require("../services/quizService");

exports.index = async (req, res) => {
   try {
    const categories = await getCategory();
    res.render("admin-Dashboard", { categories }); 
  } catch (err) {
    console.error("Error loading form:", err);
    res.status(500).send("Error loading form");
  }
};


exports.AddQuiz = async (req, res) => {
  try {
    // const userId = req.session.user.id;
    const { quizId, questionText, answerText,status} = req.body;
    

    await createQuiz(quizId, questionText,answerText, status);
    res.redirect("admin-Dashboard");

    res.json({ message: "Quiz created successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error creating quiz");
  }
};
