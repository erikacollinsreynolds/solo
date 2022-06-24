const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const studentSchema = new Schema({
  studentFirstName: {type: String, required: true},
  studentLastName: {type: String, required: true},
  classID: {type: String, required: true}
});

module.exports = mongoose.model('Student', studentSchema);