const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const classSchema = new Schema({
  className: {type: String, required: true}
});

module.exports = mongoose.model('Class', classSchema);