const Book = require('../models/Book');

// Listar todos os livros
exports.listBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar livros' });
  }
};

// Buscar um livro específico pelo ID
exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: 'Livro não encontrado' });
    res.json(book);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar o livro' });
  }
};

// Criar um novo livro
exports.createBook = async (req, res) => {
  try {
    const book = await Book.create(req.body);
    res.status(201).json(book);
  } catch (error) {
    res.status(400).json({ message: 'Erro ao cadastrar livro' });
  }
};

// Atualizar um livro (ex: marcar como lido)
exports.updateBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!book) return res.status(404).json({ message: 'Livro não encontrado' });
    res.json(book);
  } catch (error) {
    res.status(400).json({ message: 'Erro ao atualizar livro' });
  }
};

// Deletar um livro
exports.deleteBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) return res.status(404).json({ message: 'Livro não encontrado' });
    res.json({ message: 'Livro removido da biblioteca' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar livro' });
  }
};