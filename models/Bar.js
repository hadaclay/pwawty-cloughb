const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const barSchema = new mongoose.Schema({
  yelpSlug: {
    type: String,
    required: true
  },
  amountGoing: {
    type: Number,
    default: 0
  },
  usersGoing: [
    { type: mongoose.Schema.ObjectId, ref: 'User' }
  ]
});

module.exports = mongoose.model('Bar', barSchema);
