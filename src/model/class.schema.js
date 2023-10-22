const mongoose = require("mongoose");

// Define the class schema
const classSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  classImage: {
    type: String,
    required: true,
  },
  instructor: {},
  whyYouNeedThisCourse: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  requirements: {
    type: [String],
    required: true,
  },
  curriculum: {
    type: [String],
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  totalLessons: {
    type: Number,
    required: true,
  },
  totalQuizzes: {
    type: Number,
    required: true,
  },
  approved: {
    type: Boolean,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  tags: {
    type: [String],
    required: true,
  },
  learningObjectives: {
    type: [String],
    required: true,
  },
  targetAudience: {
    type: [String],
    required: true,
  },
  classCategory: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Class", classSchema);
