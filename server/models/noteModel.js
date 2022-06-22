const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const noteSchema = new Schema({
  studentName: {type: String, required: true},
  subject: String,
  note: {type: String, required: true}
});

module.exports = mongoose.model('Note', noteSchema);