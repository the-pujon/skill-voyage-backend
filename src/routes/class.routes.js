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

const { verifyJWT, verifyInstructor, verifyAdmin} = require('../middlewares/auth')

// Define routes for class APIs
router.get("/", getAllClasses);
router.post("/",verifyJWT, verifyInstructor, createClass);
router.get("/:id", getClassById);
router.put("/:id",verifyJWT, verifyAdmin, updateClassById);
router.delete("/:id",verifyJWT, verifyAdmin, deleteClassById);
router.get("/email/:email", getClassByEmail);
router.get("/category/:category", getClassesByCategory);

module.exports = router;
