const mongoose = require('mongoose');

const PeriodSchema = new mongoose.Schema({
  id: Number,
  subject: String,
  course_code: String,
});

const Period = mongoose.model('Period', PeriodSchema);

module.exports = Period;
