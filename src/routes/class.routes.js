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

const {verifyAdmin, verifyJWT} = require('../middlewares/auth')

// Define routes for class APIs
router.get("/", getAllClasses);
router.post("/",verifyJWT, createClass);
router.get("/:id", getClassById);
router.put("/:id",verifyJWT, updateClassById);
router.delete("/:id",verifyJWT, deleteClassById);
router.get("/email/:email", getClassByEmail);
router.get("/category/:category", getClassesByCategory);

module.exports = router;
