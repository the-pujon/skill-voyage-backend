const express = require("express");
const router = express.Router();

// Import the instructor controllers
const {
  getInstructors,
  addInstructor,

  updateInstructor,
  deleteInstructor,

  getSingleInstructor,
} = require("../controllers/instructor.controller");

const {verifyAdmin, verifyJWT} = require('../middlewares/auth')

// Define routes for instructors
router.get("/", getInstructors);
router.post("/",verifyJWT, addInstructor);
router.get("/:email", getSingleInstructor);
router.get("/:id", getSingleInstructor);
router.put("/:email",verifyJWT,verifyAdmin, updateInstructor);
router.delete("/:email",verifyJWT,verifyAdmin, deleteInstructor);

module.exports = router;
