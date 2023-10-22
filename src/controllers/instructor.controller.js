// Import the Instructor model
const e = require("express");
const Instructor = require("../model/instructor.schema");

// Controller for getting instructors with optional category filter
exports.getInstructors = async (req, res) => {
  try {
    // Check if a category is provided in the query, filter accordingly
    if (req.query.category) {
      const instructors = await Instructor.find({
        instructorFor: req.query.category,
      });
      res.json(instructors);
    } else {
      // If no category is provided, return all instructors
      const instructors = await Instructor.find();
      res.json(instructors);
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching instructors", error: error.message });
  }
};

// Controller for adding a new instructor
exports.addInstructor = async (req, res) => {
  try {
    const instructor = await Instructor.findOne({ email: req.body.email });

    if (!instructor) {
      const newInstructor = new Instructor(req.body);
      const savedInstructor = await newInstructor.save();
      res.json(savedInstructor);
    } else {
      res.json({ message: "You already applied" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error adding instructor", error: error.message });
  }
};

// Controller for getting an instructor by email
exports.getSingleInstructor = async (req, res) => {
  try {
    const id = req.query.id;
    const email = req.query.email;
    let instructor;
    console.log(id);

    if (id) instructor = await Instructor.findById(id).exec();
    else instructor = await Instructor.findOne({ email: req.params.email });

    if (instructor) {
      res.json(instructor);
    } else {
      res.status(404).json({ message: "Instructor not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching instructor", error: error.message });
  }
};

// Controller for getting an instructor by email
//exports.getInstructorById = async (req, res) => {
//  try {
//    const id = req.params.id;
//    console.log(id);
//    const instructor = await Instructor.findById(id).exec();
//    //const  = await Instructor.findById({ _id: req.params.id });
//    console.log(instructor);
//    if (instructor) {
//      res.json(instructor);
//    } else {
//      res.status(404).json({ message: "Instructor not found" });
//    }
//  } catch (error) {
//    res
//      .status(500)
//      .json({ message: "Error fetching instructor", error: error.message });
//  }
//};

// Controller for updating an instructor by email
exports.updateInstructor = async (req, res) => {
  try {
    console.log(req.params.email);
    const updatedInstructor = await Instructor.findOneAndUpdate(
      { email: req.params.email },
      req.body,
      { new: true }
    );
    if (updatedInstructor) {
      res.json(updatedInstructor);
    } else {
      res.status(404).json({ message: "Instructor not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating instructor", error: error.message });
  }
};

// Controller for deleting an instructor by email
exports.deleteInstructor = async (req, res) => {
  try {
    const deletedInstructor = await Instructor.findOneAndRemove({
      email: req.params.email,
    });
    if (deletedInstructor) {
      res.json(deletedInstructor);
    } else {
      res.status(404).json({ message: "Instructor not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting instructor", error: error.message });
  }
};
