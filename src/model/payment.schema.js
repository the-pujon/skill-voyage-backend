const mongoose = require("mongoose");

// Define the payment schema
const paymentSchema = new mongoose.Schema({
  sessionId: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  totalAmount: {
    type: mongoose.Schema.Types.Mixed,
    required: false,
  },
  courses: [],
  paymentStatus: {},
  date: {
    type: String,
    default: Date.now
  },
});

module.exports = mongoose.model("Payment", paymentSchema);
