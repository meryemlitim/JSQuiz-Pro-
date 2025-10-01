const express = require('express');
const app = express();
const path = require('path');
const routes = require('./routes/routes');
const session = require("express-session");

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files (CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));


// Session
app.use(session({
  secret: "mySecret",
  resave: false,
  saveUninitialized: false
}));

// Use routes
app.use('/', routes);

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
