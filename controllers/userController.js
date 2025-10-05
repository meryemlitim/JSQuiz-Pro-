  const QuizService = require("../services/service");
  const { getCategory } = require("../services/quizService");
  const { login } = require("./authController");

  // Display home page
  exports.index = async (req, res) => {
    const user = req.session.user;

    try {
      const categories = await getCategory(); 
      const topUsers = await QuizService.getLeaderboard(); 
      const userStats = await QuizService.getUserStats(user.id);


      if (user.role === "admin") {
        res.render("admin", { user });
      } else {
        res.render("index", { user, categories , topUsers , userStats});  
      }
    } catch (err) {
      console.error(err);
      res.status(500).send("Error loading home page");
    }
  };

  // Display quiz page
  exports.quiz = async (req, res) => {
    console.log(req.query);
    console.log(req.params);
    console.log(req.session);
    
    
    
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

      // const user = { id: 1, name: username };

      const user = req.session.user;
      
      if (!user) {
        throw new Error("User not found");
      }

      const rapportId = await QuizService.saveRapport(
        user,
        category,
        finalScore,
        totalTime,
        responses,
        req.session
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

  exports.history = async (req, res) => {
    const user = req.session.user;
    if (!user) return res.redirect("/login");

    try {
      const history = await QuizService.getUserHistory(user.id);
      res.render("history", { user, history });
    } catch (err) {
      console.error(err);
      res.status(500).send("Error loading history");
    }
  };
