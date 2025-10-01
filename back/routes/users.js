const express = require("express");
const router = express.Router();
const db = require("../database/db");

const notFoundMessage = "User not found!";

router.get("/", (req, res) => {
  db.all("SELECT * FROM users", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

router.get("/:id", (req, res) => {
  const id = req.params.id;

  db.get("SELECT * FROM users WHERE id = ?", [id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: notFoundMessage });
    res.json(row);
  });
});

router.post("/", (req, res) => {
  const { name, password, type } = req.body;

  db.run(
    "INSERT INTO users (name, password, type) VALUES (?, ?, ?)",
    [name, password, type],
    function(err) {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ id: this.lastID, name, password, type });
    }
  )
});

router.put("/:id", (req, res) => {
  const id = req.params.id;
  const { name, password, type } = req.body;

  db.run(
    "UPDATE users SET name = ?, password = ?, type = ? WHERE id = ?",
    [name, password, type, id],
    function(err) {
      if (err) return res.status(500).json({ error: err.message });
      if (this.changes === 0) return res.status(404).json({ error: notFoundMessage });
      res.json({ id, name, password, type });
    }
  )
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;

  db.run("DELETE FROM users WHERE id = ?", [id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ error: notFoundMessage });
    res.status(204).send();
  })
});

module.exports = router;