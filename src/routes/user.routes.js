const router = require("express").Router();
const {
  getAllUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  getJwtToken,
} = require("../controllers/user.controller");

const {verifyAdmin, verifyJWT} = require('../middlewares/auth')

router.get("/", verifyJWT, getAllUsers);
router.get("/:email", verifyJWT, getSingleUser);
router.post("/", createUser);
router.patch("/:email",verifyJWT, updateUser);
router.delete("/:email", verifyJWT, deleteUser);
router.post("/jwt", getJwtToken);

module.exports = router;
