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
    type: mongoose.Schema.Types.Mixed, // or specify String/Number based on your requirements
    required: false,
  },
  courses: [],
  paymentStatus: {},
  date: {
    type: String,
    default: Date.now
  },
  // Add other payment-related fields as needed
});

// Create a model from the schema
module.exports = mongoose.model("Payment", paymentSchema);
