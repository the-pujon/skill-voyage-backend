const express = require("express");
const router = express.Router();
const {
  getAllClasses,
  createClass,
  getClassById,
  updateClassById,
  deleteClassById,
  getClassByEmail,
  getClassesByCategory,
} = require("../controllers/class.controller");

// Define routes for class APIs
router.get("/", getAllClasses);
router.post("/", createClass);
router.get("/:id", getClassById);
router.put("/:id", updateClassById);
router.delete("/:id", deleteClassById);
router.get("/email/:email", getClassByEmail);
router.get("/category/:category", getClassesByCategory);

module.exports = router;
