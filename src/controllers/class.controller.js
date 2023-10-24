const Class = require('../model/class.schema');

// Get all classes
exports.getAllClasses = async (req, res) => {
  try {
    const classes = await Class.find();
    res.json(classes);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching classes', error: error.message });
  }
};

// Create a new class
exports.createClass = async (req, res) => {
  try {
    const newClass = new Class(req.body);
    const savedClass = await newClass.save();
    res.status(201).json(savedClass);
  } catch (error) {
    res.status(500).json({ message: 'Error creating class', error: error.message });
  }
};

// Get class by ID
exports.getClassById = async (req, res) => {
  try {
    const getClassById = await Class.findById(req.params.id);
    if (!getClassById) {
      res.status(404).json({ message: 'Class not found' });
    } else {
      res.json(getClassById);
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching class', error: error.message });
  }
};

// Update class by ID
exports.updateClassById = async (req, res) => {
  try {
    const updatedClass = await Class.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedClass) {
      res.status(404).json({ message: 'Class not found' });
    } else {
      res.json(updatedClass);
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating class', error: error.message });
  }
};

// Delete class by ID
exports.deleteClassById = async (req, res) => {
  try {
    const deletedClass = await Class.findByIdAndRemove(req.params.id);
    if (!deletedClass) {
      res.status(404).json({ message: 'Class not found' });
    } else {
      res.json(deletedClass);
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting class', error: error.message });
  }
};

// Get class by email
exports.getClassByEmail = async (req, res) => {
  try {
    const classes = await Class.find({ email: req.params.email });
    if (classes.length === 0) {
      res.status(404).json({ message: 'Class not found' });
    } else {
      res.json(classes);
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching class', error: error.message });
  }
};

// Get classes by category
//exports.getClassesByCategory = async (req, res) => {
//  try {
//    const classes = await Class.find({ classCategory: req.params.category });
//    res.json(classes);
//  } catch (error) {
//    res.status(500).json({ message: 'Error fetching classes', error: error.message });
//  }
//};

// Get classes by category, with optional subcategory
exports.getClassesByCategory = async (req, res) => {
  const category = req.params.category;
  const subcategory = req.query.subcategory;

  try {
    // Define a filter object based on the category
    const filter = { classCategory: category };

    if (subcategory) {
      // If subcategory is provided, include it in the filter
      filter.classSubcategory = subcategory;
    }

    const classes = await Class.find(filter);

    if (classes.length === 0) {
      res.status(404).json({ message: 'No classes found for the provided category and subcategory' });
    } else {
      res.json(classes);
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching classes', error: error.message });
  }
};
