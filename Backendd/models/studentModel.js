const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
  },
  age: {
    type: Number,
    required: true,
    min: 1,
  },
  class: {
    type: String,
    required: true,
    minlength: 2,
  },
  grade: {
    type: String,
    required: true,
    enum: ['A', 'B', 'C', 'D', 'F'],  // Grade validation
  },
});

module.exports = mongoose.model('Student', studentSchema);
