const router = require("express").Router();
const {
  getAllUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  getJwtToken,
} = require("../controllers/user.controller");

router.get("/", getAllUsers);
router.get("/:email", getSingleUser);
router.post("/", createUser);
router.patch("/:email", updateUser);
router.delete("/:email", deleteUser);
router.post("/jwt", getJwtToken);

module.exports = router;
