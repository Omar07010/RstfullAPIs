const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const DB_URI = process.env.MONGO_URI;

async function connectDB() {
  try {
    await mongoose.connect(DB_URI);
    console.log('connected successfully with MongoDB');
  } catch (err) {
    console.error('Faild to connect to db', err);
    process.exit(1); // إيقاف العملية في حال فشل الاتصال
  }
}


module.exports = connectDB