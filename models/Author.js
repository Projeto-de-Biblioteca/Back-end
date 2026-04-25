const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema(
  {
    name: { 
      type: String, 
      required: true, 
      trim: true 
    },
    nationality: { 
      type: String, 
      trim: true 
    },
    birthYear: { 
      type: Number 
    }
  },
  {
    timestamps: true 
  }
);

module.exports = mongoose.model('Author', authorSchema);