// auth.js
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import PredefinedCodes from './models/AuthCode.js'; // Ensure correct import

dotenv.config();

const app = express();
const port = process.env.AUTH_PORT || 5003;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});

app.post('/api/authenticate', async (req, res) => {
  const { code } = req.body;

  try {
    const authCode = await PredefinedCodes.findOne({ code });

    if (authCode) {
      console.log(`Authenticated with code from database: ${authCode.code}`);
      res.json({ authenticated: true });
    } else {
      console.log('Authentication failed. Code not found in database.');
      res.json({ authenticated: false });
    }
  } catch (error) {
    console.error('Error authenticating:', error);
    res.status(500).json({ message: 'Error authenticating. Please try again.' });
  }
});

app.listen(port, () => {
  console.log(`Auth server is running on port: ${port}`);
});
