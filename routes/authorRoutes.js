const express = require('express');
const router = express.Router();
const authorController = require('../controllers/authorController');

// Rota para listar todos e criar novo
router.get('/', authorController.listAuthors);
router.post('/', authorController.createAuthor);

// Rota para deletar
router.delete('/:id', authorController.deleteAuthor);

module.exports = router;