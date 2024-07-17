// authCodes.js

import express from 'express';
const router = express.Router();
import AuthCode from '../models/AuthCode.js';

// Endpoint to retrieve all authentication codes
router.get('/auth-codes', async (req, res) => {
  try {
    const codes = await AuthCode.find();
    res.json(codes);
  } catch (error) {
    console.error('Error fetching codes:', error);
    res.status(500).send('Error fetching codes');
  }
});

export { router }; // Export router as a named export
