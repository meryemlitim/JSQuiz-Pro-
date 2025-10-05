const bcrypt = require("bcryptjs");
const db = require("../models/db");

// Creat user  :
async function createUser(name, password, email) {
  const hashedPassword = await bcrypt.hash(password, 10);
  await db.query(
    "INSERT INTO user (name, password, email) VALUES (?, ?, ?)",
    [name, hashedPassword, email]
  );
}

// Search By Email :
async function getUserByEmail(email) {
  const [rows] = await db.query("SELECT * FROM user WHERE email = ?", [email]);
  return rows[0];
}


// Verify password :
async function checkPassword(password, hashedPassword) {
  return await bcrypt.compare(password, hashedPassword);
}

// Fetch user data to display on the admin dashboard :
async function getUsers(){
  const [result] = await db.query("SELECT * FROM user WHERE role = 'user' ORDER BY totalScore DESC");
  console.log(result);
  return result;
}


module.exports = { createUser, getUserByEmail, checkPassword, getUsers };
