const express = require('express');
const { v4: uuidv4 } = require('uuid');
const NotFoundError = require('../errors/NotFoundError');
const ValidationError = require('../errors/ValidationError');
const paginate = require('../utils/pagination');

const router = express.Router();

let products = [
  { id: uuidv4(), name: 'Laptop', description: '16GB RAM', price: 1200, category: 'electronics', inStock: true },
  { id: uuidv4(), name: 'Smartphone', description: '128GB Storage', price: 800, category: 'electronics', inStock: true },
  { id: uuidv4(), name: 'Coffee Maker', description: 'Programmable with timer', price: 50, category: 'kitchen', inStock: false }
];

// GET /api/products?category=&search=&page=&limit=
router.get('/', (req, res) => {
  let { category, search, page = 1, limit = 10 } = req.query;
  let results = [...products];

  if (category) results = results.filter(p => p.category === category);
  if (search) results = results.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

  const data = paginate(results, parseInt(page), parseInt(limit));
  res.json(data);
});

// GET /api/products/:id
router.get('/:id', (req, res, next) => {
  const product = products.find(p => p.id === req.params.id);
  if (!product) return next(new NotFoundError('Product not found'));
  res.json(product);
});

// POST /api/products
router.post('/', (req, res, next) => {
  const { name, description, price, category, inStock } = req.body;
  if (!name || !description || price == null || !category || inStock == null) {
    return next(new ValidationError('All fields (name, description, price, category, inStock) are required.'));
  }

  const newProduct = { id: uuidv4(), name, description, price, category, inStock };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

// PUT /api/products/:id
router.put('/:id', (req, res, next) => {
  const index = products.findIndex(p => p.id === req.params.id);
  if (index === -1) return next(new NotFoundError('Product not found'));
  products[index] = { ...products[index], ...req.body };
  res.json(products[index]);
});

// DELETE /api/products/:id
router.delete('/:id', (req, res, next) => {
  const index = products.findIndex(p => p.id === req.params.id);
  if (index === -1) return next(new NotFoundError('Product not found'));
  const deleted = products.splice(index, 1);
  res.json({ message: 'Product deleted successfully', deleted });
});

// GET /api/products/stats/count-by-category
router.get('/stats/count-by-category', (req, res) => {
  const stats = products.reduce((acc, p) => {
    acc[p.category] = (acc[p.category] || 0) + 1;
    return acc;
  }, {});
  res.json(stats);
});

module.exports = router;
