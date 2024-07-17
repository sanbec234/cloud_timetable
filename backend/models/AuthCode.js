// AuthCode.js or AuthCode.mjs (assuming it's a TypeScript file)
import mongoose from 'mongoose';

const authCodeSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true,
  },
});

const PredefinedCodes = mongoose.model('predefinedCodes', authCodeSchema);

export default PredefinedCodes;
