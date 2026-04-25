const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');

// Caminhos para a lista geral
router.get('/', bookController.listBooks);
router.post('/', bookController.createBook);

// Caminhos para um livro específico (usando ID)
router.get('/:id', bookController.getBookById);
router.put('/:id', bookController.updateBook);
router.delete('/:id', bookController.deleteBook);

module.exports = router;