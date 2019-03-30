"use strict";

const express = require("express");
const router = express.Router();

const Users = require("../controllers/users");

router.post("/login", Users.login);
router.post("/hero/register", Users.registerHero);
router.post("/driver/register", Users.registerDriver);
router.post("/hero/location", Users.updateHeroLocation);
router.post("/driver/location", Users.updateDriverLocation);

module.exports = router;
