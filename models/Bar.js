const mongoose = require('mongoose');
const findOrCreate = require('mongoose-findorcreate');
mongoose.Promise = global.Promise;

const barSchema = new mongoose.Schema({
  yelpSlug: {
    type: String,
    required: true
  },
  usersGoing: [
    { type: mongoose.Schema.ObjectId, ref: 'User' }
  ],
  // Wipe out docs after 16 hours
  // not a great solution, but works for the purposes of this project
  createdAt: {
    type: Date,
    expires: '16h',
    default: Date.now
  }
});

barSchema.plugin(findOrCreate);

module.exports = mongoose.model('Bar', barSchema);
