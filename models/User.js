const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const userSchema = new mongoose.Schema({});

module.exports = mongoose.model('User', userSchema);
