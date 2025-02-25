const express = require('express');
const db = require('../db');
const router = express.Router();

// Get all products
router.get('/', (req, res) => {
  db.query('SELECT * FROM products', (err, results) => {
    if (err) return res.status(500).json({ message: 'Error fetching products' });
    res.json(results);
  });
});

// Add a new product
router.post('/add', (req, res) => {
  const { name, price, description, image } = req.body;
  db.query('INSERT INTO products (name, price, description, image) VALUES (?, ?, ?, ?)', 
    [name, price, description, image], (err, result) => {
      if (err) return res.status(500).json({ message: 'Error adding product' });
      res.status(201).json({ message: 'Product added successfully' });
    });
});

// Delete a product
router.delete('/delete/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM products WHERE id = ?', [id], (err, result) => {
    if (err) return res.status(500).json({ message: 'Error deleting product' });
    res.json({ message: 'Product deleted successfully' });
  });
});

module.exports = router;
