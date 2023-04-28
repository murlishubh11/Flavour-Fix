const mongoose = require('mongoose')

// Define the MenuItem schema
const menuItemSchema = new mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    category: String,
    tags: [String],
    type: String 
  });
  


const modelName = 'MenuItem'

module.exports = mongoose.model(modelName,  menuItemSchema)
