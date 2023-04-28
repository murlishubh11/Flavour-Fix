const mongoose = require('mongoose');

const instance = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      enum: ['user', 'admin'],
      default: 'user',
    },
    cookstyle: {
      type: String,
      enum: ['Indian', 'Chinese', 'Italian'],
      required: function() {
        return this.role === 'user';
      },
    },
  },
  {
    timestamps: true,
  }
);

// NOTE: use a singular model name, mongoose automatically creates a collection like so:
// model: 'Account' === collection: 'accounts'
const modelName = 'Account';

module.exports = mongoose.model(modelName, instance);
