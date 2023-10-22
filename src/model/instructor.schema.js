const mongoose = require("mongoose");

// Define the instructor schema
const instructorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  instructorImage: {},
  email: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  experience: {
    type: Number,
    required: true,
  },
  education: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  about: {
    type: String,
    require: true,
  },
  approved: {
    type: Boolean,
    default: false,
  },
  rating: [],
});

module.exports = mongoose.model("Instructor", instructorSchema);
