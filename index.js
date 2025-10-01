const express = require("express");
const session = require("express-session");
const authRoutes = require("./routes/authRoutes");

const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

// Session
app.use(session({
  secret: "mySecret",
  resave: false,
  saveUninitialized: false
}));

// Routes
app.use("/", authRoutes);

app.listen(3000, () => {
  console.log("✅ Server running on http://localhost:3000");
});
