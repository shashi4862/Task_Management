const express = require("express");
const {
  registerController,
  createTable,
  loginUser,
} = require("../controllers/AuthController");
const router = express.Router();

router.post("/register", registerController);
router.post("/login", loginUser);

router.get("/create/table", createTable);
module.exports = router;
