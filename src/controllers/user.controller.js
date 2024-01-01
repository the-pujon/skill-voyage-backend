const User = require("../model/user.schema");
const jwt = require("jsonwebtoken");

/**
 * (Create)
 * for creating a new user
 */
const createUser = async (req, res) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email });

    if (!existingUser) {
      const newUser = new User(req.body);
      await newUser.save();
      res.status(200).json(newUser);
    } else {
      res.status(200).json({ message: "User already exists" });
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

/**
 * (Read)
 * for getting all users
 */
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).send(error);
  }
};

/**
 * (Read)
 * for getting a single user
 */
const getSingleUser = async (req, res) => {
  try {
    const singleUser = await User.findOne({ email: req.params.email });
    res.status(200).json(singleUser);
  } catch (error) {
    res.status(500).send(error);
  }
};

/**
 * (Update)
 * for updating a single user
 */
const updateUser = async (req, res) => {
  try {
    const userUpdate = await User.findOneAndUpdate(
      { email: req.params.email },
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(userUpdate);
  } catch (error) {
    res.status(500).send(error);
  }
};

/**
 * (Delete)
 * for deleting a single user
 */
const deleteUser = async (req, res) => {
  try {
    const userDelete = await User.findOneAndRemove({ email: req.params.email });
    res.status(200).json(userDelete);
  } catch (error) {
    res.status(500).send(error);
  }
};

// JWT token sending
const getJwtToken = async (req, res) => {
  const token = jwt.sign(req.body, process.env.SECRET_ACCESS_TOKEN, {
    expiresIn: "5h",
  });
  res.send({ token });
};



module.exports = {
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
  createUser,
  getJwtToken,
};
