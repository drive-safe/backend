"use strict";

const jwt = require("../utils/jwt");
const DriverModel = require("../models/Driver");
const HeroModel = require("../models/Hero");
const { HTTP_STATUS, CLIENT } = require("../utils/constants");

module.exports = async (req, res, next) => {
	console.log(req.url);
	console.log(req.method);
	if (req.url === "/users/login" && req.method === "POST") return next();
	if (req.url === "/users/hero/register" && req.method === "POST") return next();
	if (req.url === "/users/driver/register" && req.method === "POST") return next(); 
	if (req.url === "/users/hero/location" && req.method === "POST") return next(); 
	if (req.url === "/users/driver/location" && req.method === "POST") return next(); 


	let token;
	const bearer = req.get("Authorization");
	if (bearer) { token = bearer; }
	else { token = req.cookies && req.cookies.token; }

	if (!token) return res.status(401).json(HTTP_STATUS[401]);

	try {
		let payload = await jwt.verifyToken(token);
		if(payload.client === CLIENT['HERO']) {
      let user = await HeroModel.findById(payload.id);  
    } else {
      let user = await DriverModel.findById(payload.id);  
    }

		if (!user) res.status(401).json(HTTP_STATUS[401]);

    if (user.id !== payload.id
      || user.email !== payload.email
      || user.password !== payload.password
      || user.client !== payload.client) res.status(401).json(HTTP_STATUS[401]);

    req.user = payload;

    next();
	} catch(e) {
    console.poo(e);
    res.status(401).json(HTTP_STATUS[401]);
  }
};
