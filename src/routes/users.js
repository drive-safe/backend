"use strict";

const express = require("express");
const router = express.Router();

const Users = require("../controllers/users");

router.post("/login", Users.login);
router.post("/hero/register", Users.registerHero);
router.post("/driver/register", Users.registerDriver);
router.post("/hero/location", Users.updateHeroLocation);
router.post("/driver/location", Users.updateDriverLocation);
router.get("/driver/location/:driver", Users.getDriverLocation);
router.get("/hero/location/:hero", Users.getHeroLocation);
router.post("/hero/driver/location", Users.getCaseLocation);
router.post("/driver/help", Users.getHelp);

module.exports = router;
