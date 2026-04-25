const Author = require('../models/Author');

// Listar todos os autores
exports.listAuthors = async (req, res) => {
  try {
    const authors = await Author.find();
    res.json(authors);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar autores' });
  }
};

// Criar um novo autor
exports.createAuthor = async (req, res) => {
  try {
    const author = await Author.create(req.body);
    res.status(201).json(author);
  } catch (error) {
    res.status(400).json({ message: 'Erro ao criar autor' });
  }
};

// Deletar um autor
exports.deleteAuthor = async (req, res) => {
  try {
    const author = await Author.findByIdAndDelete(req.params.id);
    if (!author) return res.status(404).json({ message: 'Autor não encontrado' });
    res.json({ message: 'Autor removido com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar autor' });
  }
};