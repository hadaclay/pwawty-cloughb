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
  ]
});

module.exports = mongoose.model('User', userSchema);
