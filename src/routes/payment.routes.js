// Import required modules
const express = require("express");
const router = express.Router();
const {
  createPayment,
  getAllPayments,
  getPaymentsByEmail,
} = require("../controllers/payment.controller");

// Define routes
router.get("/", getAllPayments);
router.get("/:email", getPaymentsByEmail);
router.post("/", createPayment);

// Export the router
module.exports = router;
