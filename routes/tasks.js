const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/Task");
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
const passport = require('passport');
const validateTaskInput = require('../validation/valid-task');
router.get("/test", (req, res) => res.json({ msg: "This is the tasks route" }));

module.exports = router;