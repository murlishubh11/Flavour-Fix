const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  review: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true
  },
  photo: {
    type: String
  },
  phoneNumber: {
    type: String
  }
});

const modelName = 'Review';

module.exports = mongoose.model(modelName, reviewSchema);
