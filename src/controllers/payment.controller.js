// Import the Payment model
const Payment = require("../model/payment.schema");

// Controller for getting all payments
const getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find();
    res.json(payments);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Controller for filtering payments by email
const getPaymentsByEmail = async (req, res) => {
  const { email } = req.params;
  try {
    const payments = await Payment.find({ email });
    res.json(payments);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Controller for creating a new payment
const createPayment = async (req, res) => {
  const { transactionId, email, paymentStatus, courses } = req.body;
  try {
    const payment = new Payment({
      transactionId,
      email,
      paymentStatus,
      courses,
    });
    await payment.save();
    res.json(payment);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Export the controller functions
module.exports = {
  getAllPayments,
  getPaymentsByEmail,
  createPayment,
};
