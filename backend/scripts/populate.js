const mongoose = require('mongoose');
const Period = require('../models/Period');
require('dotenv').config({ path: '../.env' });  // Ensure the correct path to .env

const mongoURI = process.env.MONGODB_URI;

if (!mongoURI) {
  throw new Error('MONGODB_URI is not defined in the environment variables');
}
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const periods = [
    { "id": 1,  "course_code": "192701" },
    { "id": 2,  "course_code": "192701" },
    { "id": 3,  "course_code": "" },
    { "id": 4,  "course_code": "192030" },
    { "id": 5,  "course_code": "192030" },
    { "id": 6,  "course_code": "192701" },
    { "id": 7,  "course_code": "192701" },
    { "id": 8,  "course_code": "192701" },
    { "id": 9,  "course_code": "192026" },
    { "id": 10,  "course_code": "192026" },
    { "id": 11,  "course_code": "192028" },
    { "id": 12,  "course_code": "192028" },
    { "id": 13,  "course_code": "192026" },
    { "id": 14,  "course_code": "192026" },
    { "id": 15,  "course_code": "TWN" },
    { "id": 16,  "course_code": "TWN" },
    { "id": 17,  "course_code": "192013" },
    { "id": 18,  "course_code": "192013" },
    { "id": 19,  "course_code": "192003" },
    { "id": 20,  "course_code": "192003" },
    { "id": 21,  "course_code": "192028" },
    { "id": 22,  "course_code": "192028" },
    { "id": 23,  "course_code": "192013" },
    { "id": 24,  "course_code": "192013" },
    { "id": 25,  "course_code": "192028" },
    { "id": 26,  "course_code": "192028" },
    { "id": 27,  "course_code": "192720" },
    { "id": 28,  "course_code": "192720" },
    { "id": 29,  "course_code": "192720" },
    { "id": 30,  "course_code": "192720" },
    { "id": 31,  "course_code": "192720" },
    { "id": 32,  "course_code": "192720" },
    { "id": 33,  "course_code": "192701" },
    { "id": 34,  "course_code": "192701" },
    { "id": 35,  "course_code": "192701" },
    { "id": 36,  "course_code": "192701" },
    { "id": 37,  "course_code": "192701" },
    { "id": 38,  "course_code": "192701" },
    { "id": 39,  "course_code": "192701" },
    { "id": 40,  "course_code": "192701" }  
];

Period.insertMany(periods)
  .then(() => {
    console.log('Data inserted');
    mongoose.connection.close();
  })
  .catch((error) => {
    console.error('Error inserting data:', error);
    mongoose.connection.close();
  });
