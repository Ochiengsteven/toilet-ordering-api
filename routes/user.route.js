const express = require("express");
const router = express.Router();
const {
  signUp,
  login,
  deleteUser,
  updateUser,
  getAllUsers
} = require("../controllers/user.controller.js");

// Routes
router.post("/signup", signUp);

router.get("/", getAllUsers);

router.post("/login", login);

router.put("/:id", updateUser);

router.delete("/:id", deleteUser);

module.exports = router;
