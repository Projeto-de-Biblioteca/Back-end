const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema(
  {
    title: { 
      type: String, 
      required: true, 
      trim: true 
    },
    genre: { 
      type: String, 
      required: true 
    },
    pages: { 
      type: Number 
    },
    readStatus: { 
      type: Boolean, 
      default: false 
    },
    authorName: { 
      type: String, 
      required: true 
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Book', bookSchema);