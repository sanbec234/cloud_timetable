const express = require('express');
const router = express.Router();
const periodService = require('../services/periodService');

// Update endpoint
router.put('/periods/:courseCode', async (req, res) => {
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
router.delete('/periods/:courseCode', async (req, res) => {
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
