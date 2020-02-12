const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: String,
  pw: String,
  userName: String,
});

const User = mongoose.model('User', userSchema);

module.exports = User;
