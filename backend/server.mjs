import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { router as authCodesRouter } from './routes/authCodes.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 5002;

// Define CORS options
const corsOptions = {
  origin: 'http://localhost:3000',  // Replace with your frontend URL
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 200,
};

// Apply CORS middleware with options
app.use(cors(corsOptions));
app.use(express.json());
app.use('/api', authCodesRouter);

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define MongoDB schema and model
const periodSchema = new mongoose.Schema({
  id: Number,
  subject: String,
  course_code: String,
});

const Period = mongoose.model('Period', periodSchema);

// API endpoint to fetch all periods
app.get('/api/periods', async (req, res) => {
  try {
    const periods = await Period.find();
    res.json(periods);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// API endpoint to create a new period
app.post('/api/periods', async (req, res) => {
  try {
    const period = new Period(req.body);
    await period.save();
    res.json(period);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// API endpoint to update a period by ID (partial update)
app.put('/api/periods/:id', async (req, res) => {
  try {
    const update = {};
    if (req.body.subject) update.subject = req.body.subject;
    if (req.body.course_code) update.course_code = req.body.course_code;

    const period = await Period.findOneAndUpdate({ id: req.params.id }, { $set: update }, { new: true });
    res.json(period);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// API endpoint to delete a period by ID
app.delete('/api/periods/:id', async (req, res) => {
  try {
    const period = await Period.findOneAndDelete({ id: req.params.id });
    if (period) {
      res.json({ message: 'Period deleted' });
    } else {
      res.status(404).json({ message: 'Period not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
