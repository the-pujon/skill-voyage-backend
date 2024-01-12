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

router.get("/",verifyJWT,  getAllUsers);
router.get("/:email", getSingleUser);
router.post("/", createUser);
router.put("/:email",verifyJWT, verifyAdmin, updateUser);
router.delete("/:email", verifyJWT,verifyAdmin, deleteUser);
router.post("/jwt", getJwtToken);

module.exports = router;
