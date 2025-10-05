const { createQuiz, getCategory, getQuestions,deleteQues, createCategory, EditQues } = require("../services/quizService");

exports.index = async (req, res) => {
   try {
    const categories = await getCategory();
    const questions = await getQuestions();

    res.render("admin-Dashboard", { categories, questions }); 
  } catch (err) {
    console.error("Error loading category:", err);
    res.status(500).send("Error loading category");
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

exports.deleteQuestion = async (req, res) => {
    const { id } = req.params;

  try {
    await deleteQues(id); 
    res.redirect("/admin-dashboard");
  } catch (err) {
    console.error("Error deleting question:", err);
    res.status(500).send("Error deleting question");
  }
}

// add quiz category :

exports.addCategory = async (req, res) => {
  try {
    const userId = req.session.user.id;
    const { categoryName } = req.body;
    console.log("categoryName");
    console.log(categoryName);
    await createCategory(categoryName, userId);
    res.redirect("admin-Dashboard");

    // res.json({ message: "Quiz category created successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error creating quiz category");
  }
}

// edit question:

exports.EditQuestion = async (req, res) => {
 try {
    const { id, quizId, questionText,answerId, answerText,status} = req.body;
     console.log("Edit request body:", req.body); 
    await EditQues(id, quizId, questionText,answerId, answerText, status);
    res.redirect("admin-Dashboard");

  } catch (err) {
    console.error(err);
    res.status(500).send("Error editing question");
  }
}