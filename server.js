const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = 9050;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Serve all files in the root folder (index.html, gallery.html, css/, js/, etc.)
app.use(express.static(path.join(__dirname)));

// Initialize SQLite database
const db = new sqlite3.Database("./db.sqlite", (err) => {
  if (err) console.error(err.message);
  else console.log("Connected to SQLite database");
});

// Database schema
db.run(`
  CREATE TABLE IF NOT EXISTS art (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    author TEXT,
    description TEXT,
    timePosted TEXT,
    grid TEXT
  )
`);

// Routes

// Get all art submissions
app.get("/art", (req, res) => {
  db.all("SELECT * FROM art ORDER BY timePosted DESC", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    rows.forEach(row => row.grid = JSON.parse(row.grid));
    res.json(rows);
  });
});

// Post new art
app.post("/art", (req, res) => {
  const { author, description, timePosted, grid } = req.body;
  const gridJSON = JSON.stringify(grid);

  if (author.toLowerCase() === "cole chiodo") {
    return res.status(400).json({ error: "Invalid name" });
  }

  db.run(
    "INSERT INTO art (author, description, timePosted, grid) VALUES (?, ?, ?, ?)",
    [author, description, timePosted, gridJSON],
    function(err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: this.lastID });
    }
  );
});

// Explicitly serve index.html for root
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
