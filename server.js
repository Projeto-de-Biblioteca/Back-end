const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Conexão com o MongoDB Atlas
const uri = process.env.MONGODB_URI;

mongoose.connect(uri)
    .then(() => console.log('Conectado ao MongoDB Atlas com sucesso!'))
    .catch(err => console.error('Erro ao conectar ao MongoDB:', err));

// Definição do Schema do Livro
const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    authorName: { type: String, required: true },
    genre: { type: String, required: true },
    pages: { type: Number, required: true }
});

const Book = mongoose.model('Book', bookSchema);

// --- Rotas do CRUD ---

// CREATE: Salvar um novo livro
app.post('/livros', async (req, res) => {
    try {
        const newBook = new Book(req.body);
        await newBook.save();
        res.status(201).json(newBook);
    } catch (error) {
        res.status(400).json({ message: 'Erro ao salvar o livro', error });
    }
});

// READ: Listar todos os livros
app.get('/livros', async (req, res) => {
    try {
        const books = await Book.find();
        res.json(books);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar livros', error });
    }
});

// UPDATE: Editar um livro existente
app.put('/livros/:id', async (req, res) => {
    try {
        const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedBook);
    } catch (error) {
        res.status(400).json({ message: 'Erro ao atualizar o livro', error });
    }
});

// DELETE: Remover um livro
app.delete('/livros/:id', async (req, res) => {
    try {
        await Book.findByIdAndDelete(req.params.id);
        res.json({ message: 'Livro removido com sucesso' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao remover o livro', error });
    }
});

// Inicialização do Servidor
if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Servidor rodando na porta ${PORT}`);
    });
}

module.exports = app;