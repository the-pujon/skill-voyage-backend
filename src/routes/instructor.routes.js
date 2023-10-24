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

// Define routes for instructors
router.get("", getInstructors); // GET all instructors with optional category filter
router.post("/", addInstructor); // POST a new instructor
router.get("/singleInstructor/", getSingleInstructor); // GET an instructor by email
//router.get("/:id", getSingleInstructor); // GET an instructor by email
router.put("/:email", updateInstructor); // UPDATE an instructor by email
//router.delete("/:email", deleteInstructor); // DELETE an instructor by email

module.exports = router;
