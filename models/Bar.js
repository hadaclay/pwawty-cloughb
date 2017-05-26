const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const barSchema = new mongoose.Schema({});

module.exports = mongoose.model('Bar', barSchema);
