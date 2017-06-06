const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const userSchema = new mongoose.Schema({
  userID: {
    type: String,
    unique: true,
    required: true
  },
  going: [
    { type: mongoose.Schema.ObjectId, ref: 'Bar' }
  ],
  // Wipe out docs after 16 hours
  // not a great solution, but works for the purposes of this project
  createdAt: {
    type: Date,
    expires: '16h',
    default: Date.now
  }
});

module.exports = mongoose.model('User', userSchema);
