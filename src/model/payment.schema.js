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
  courses: [],
  paymentStatus: {},
  // Add other payment-related fields as needed
});

// Create a model from the schema
module.exports = mongoose.model("Payment", paymentSchema);
