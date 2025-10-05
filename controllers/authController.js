const { createUser, getUserByEmail, checkPassword, index } = require("../services/userService");

// Display the registration form :
function showRegister(req, res) {
  res.render("register");
}

// Handle register :
async function register(req, res) {
  const { name, password, email } = req.body;
  await createUser(name, password, email);
  res.redirect("/login");
}

// Display the connexion  form :
function showLogin(req, res) {
  res.render("login");
}

// Handle connexion. :
async function login(req, res) {
  const { email, password } = req.body;
  const user = await getUserByEmail(email);

  if (!user) {
    return res.send("❌ Utilisateur non trouvé");
  }

  const isValid = await checkPassword(password, user.password);
  if (!isValid) {
    return res.send("❌ Mot de passe incorrect");
  }

// Save to session :
  req.session.user = { id: user.id, username: user.name, role: user.role };
 
// check the user's role :
  if (user.role === "admin") {
    res.redirect("/admin-dashboard");
  } else {
    res.redirect("/home");
  }


}

// logout :
function logout(req, res) {
  req.session.destroy(() => {
    res.redirect("/login");
  });
}

module.exports = { showRegister, register, showLogin, login, logout };
