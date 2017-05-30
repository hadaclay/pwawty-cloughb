const mongoose = require('mongoose');
const findOrCreate = require('mongoose-findorcreate');
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

barSchema.plugin(findOrCreate);

module.exports = mongoose.model('Bar', barSchema);
