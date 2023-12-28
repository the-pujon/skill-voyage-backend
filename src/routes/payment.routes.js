// Import required modules
const express = require("express");
const router = express.Router();
const {
  createPayment,
  getAllPayments,
  getPaymentsByEmail,
} = require("../controllers/payment.controller");

const {verifyAdmin, verifyJWT} = require('../middlewares/auth')

// Define routes
router.get("/",verifyJWT, getAllPayments);
router.get("/:email",verifyJWT, getPaymentsByEmail);
router.post("/",verifyJWT, createPayment);

// Export the router
module.exports = router;
