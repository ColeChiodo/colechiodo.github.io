import db from "../db.js";

function esc(s) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

export default function (app) {
  app.get("/art", (req, res) => {
    const accept = req.get("Accept") || "";
    const rows = db.query("SELECT * FROM art ORDER BY timePosted DESC").all();
    rows.forEach(row => row.grid = JSON.parse(row.grid));

    if (accept.includes("text/html")) {
      if (rows.length === 0) {
        return res.send('<div class="empty">No art yet — be the first!</div>');
      }
      const html = rows.map(d => `
        <div class="entry">
          <div class="entry-grid" style="display:grid;grid-template-columns:repeat(16,20px);gap:1px">
            ${d.grid.map(color => `<div style="width:20px;height:20px;background:${color}"></div>`).join("")}
          </div>
          <div><strong>${esc(d.author)}</strong>: ${esc(d.description)}</div>
        </div>
      `).join("");
      return res.send(html);
    }
    res.json(rows);
  });

  app.post("/art", (req, res) => {
    const author = req.body.author;
    const description = req.body.description;
    const timePosted = req.body.timePosted || new Date().toISOString();
    const grid = typeof req.body.grid === "string" ? JSON.parse(req.body.grid) : req.body.grid;

    if (!author || !description) {
      return res.status(400).send("Please enter an author and/or description.");
    }
    if (author.toLowerCase() === "cole chiodo") {
      return res.status(400).send("Invalid name.");
    }

    db.run(
      "INSERT INTO art (author, description, timePosted, grid) VALUES (?, ?, ?, ?)",
      author, description, timePosted, JSON.stringify(grid)
    );

    res.send('<div class="submitted-text">Art Successfully Submitted!</div>');
  });
}
