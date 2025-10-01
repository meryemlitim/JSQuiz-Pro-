const express = require('express');
const app = express();
const path = require('path');
const routes = require('./routes/routes');

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files (CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// Use routes
app.use('/', routes);

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});const express = require("express");
const session = require("express-session");
const authRoutes = require("./routes/authRoutes");


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
