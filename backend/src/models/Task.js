const mongoose = require('mongoose');
const { encrypt, decrypt } = require('../utils/crypto');

const taskSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      required: [true, 'Please add a title'],
      set: (val) => encrypt(val),
      get: (val) => decrypt(val),
    },
    description: {
      type: String,
      required: [true, 'Please add a description'],
      set: (val) => encrypt(val),
      get: (val) => decrypt(val),
    },
    status: {
      type: String,
      enum: ['pending', 'in-progress', 'completed'],
      default: 'pending',
    },
  },
  {
    timestamps: true,
    toJSON: { getters: true },
    toObject: { getters: true },
  }
);

module.exports = mongoose.model('Task', taskSchema);
