const bcrypt = require("bcryptjs");
const db = require("../models/db");

// Créer un utilisateur
async function createUser(name, password, email) {
  const hashedPassword = await bcrypt.hash(password, 10);
  await db.query(
    "INSERT INTO user (name, password, email) VALUES (?, ?, ?)",
    [name, hashedPassword, email]
  );
}

// Chercher par username
async function getUserByUsername(name) {
  const [rows] = await db.query("SELECT * FROM user WHERE name = ?", [name]);
  return rows[0];
}

// Vérifier mot de passe
async function checkPassword(password, hashedPassword) {
  return await bcrypt.compare(password, hashedPassword);
}

module.exports = { createUser, getUserByUsername, checkPassword };
