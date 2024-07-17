const express = require('express');
const router = express.Router();
const Period = require('../models/Period');
const periodService = require('../services/periodService');

// GET all periods
router.get('/periods', async (req, res) => {
  const periods = await Period.find();
  res.send(periods);
});

// POST a new period
router.post('/periods', async (req, res) => {
  const period = new Period(req.body);
  await period.save();
  res.send(period);
});

// PUT (update) a period by ID
router.put('/periods/:id', async (req, res) => {
  const period = await Period.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.send(period);
});

// DELETE a period by ID
router.delete('/periods/:id', async (req, res) => {
  await Period.findByIdAndDelete(req.params.id);
  res.send({ message: 'Period deleted' });
});

// Update endpoint
router.put('/periods/code/:courseCode', async (req, res) => {
  const courseCode = req.params.courseCode;
  const update = { $set: { subject: req.body.subject } };

  try {
    const result = await periodService.updatePeriods({ course_code: courseCode }, update);
    res.json({ success: true, message: 'Documents updated', result });
  } catch (error) {
    console.error('Error updating documents:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Delete endpoint
router.delete('/periods/code/:courseCode', async (req, res) => {
  const courseCode = req.params.courseCode;

  try {
    const result = await periodService.deletePeriod({ course_code: courseCode });
    res.json({ success: true, message: 'Document deleted', result });
  } catch (error) {
    console.error('Error deleting document:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
