const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const noteSchema = new Schema({
  studentName: {type: String, required: true},
  subject: {type: String, required: true},
  note: {type: String, required: true}
});

module.exports = mongoose.model('Note', noteSchema);