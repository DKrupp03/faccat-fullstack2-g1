const express = require("express");
const router = express.Router();
const db = require("../database/db");

const notFoundMessage = "Product not found!";

router.get("/", (req, res) => {
  const { name, value, quantity } = req.query;

  let query = "SELECT * FROM products";
  let params = [];
  let conditions = [];

  if (name) {
    conditions.push("name LIKE ?");
    params.push(`%${name}%`);
  }

  if (value) {
    conditions.push("value = ?");
    params.push(value);
  }

  if (quantity) {
    conditions.push("quantity = ?");
    params.push(quantity);
  }

  if (conditions.length > 0) {
    query += " WHERE " + conditions.join(" AND ");
  }

  db.all(query, params, (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

router.get("/:id", (req, res) => {
  const id = req.params.id;

  db.get("SELECT * FROM products WHERE id = ?", [id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: notFoundMessage });
    res.json(row);
  });
});

router.post("/", (req, res) => {
  const { name, value, quantity } = req.body;

  db.run(
    "INSERT INTO products (name, value, quantity) VALUES (?, ?, ?)",
    [name, value, quantity],
    function(err) {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ id: this.lastID, name, value, quantity });
    }
  )
});

router.put("/:id", (req, res) => {
  const id = req.params.id;
  const { name, value, quantity } = req.body;

  db.run(
    "UPDATE products SET name = ?, value = ?, quantity = ? WHERE id = ?",
    [name, value, quantity, id],
    function(err) {
      if (err) return res.status(500).json({ error: err.message });
      if (this.changes === 0) return res.status(404).json({ error: notFoundMessage });
      res.json({ id, name, value, quantity });
    }
  )
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;

  db.run("DELETE FROM products WHERE id = ?", [id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ error: notFoundMessage });
    res.status(204).send();
  })
});

module.exports = router;