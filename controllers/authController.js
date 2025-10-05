const { createUser, getUserByEmail, checkPassword, index } = require("../services/userService");

// Afficher le formulaire register
function showRegister(req, res) {
  res.render("register");
}

// Traiter l'inscription
async function register(req, res) {
  const { name, password, email } = req.body;
  await createUser(name, password, email);
  res.redirect("/login");
}

// Afficher le formulaire login
function showLogin(req, res) {
  res.render("login");
}

// Traiter la connexion.
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

  // sauvegarder en session
  req.session.user = { id: user.id, username: user.name, role: user.role , email: user.email , totalScore: user.totalScore};
  // res.send(`✅ Bienvenue ${user.username}`);

  if (user.role === "admin") {
    res.redirect("/admin-dashboard");
  } else {
    res.redirect("/home");
  }


}

// Déconnexion
function logout(req, res) {
  req.session.destroy(() => {
    res.redirect("/login");
  });
}

module.exports = { showRegister, register, showLogin, login, logout };
