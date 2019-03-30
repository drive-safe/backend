"use strict";

const jwt = require("jsonwebtoken");

const EXPIRTY_TIME = 0;

const generateToken = (payload, expiryTime = EXPIRY_TIME) => {
	return new Promise(async (resolve, reject) => {
		try {
			let token;
			if(typeof payload === "object") {
				token = await jwt.sign(payload, process.env.HMAC_SECRET_KEY,
					{ expiresIn: expiryTime }
				);
			} else  if(typeof payload === "string") {
        token = await jwt.sign(payload, process.env.HMAC_SECRET_KEY);
      }

      resolve(token);
    } catch (e) {
      reject(e);
    }
  });
};

const verifyToken = (token) => {
  return new Promise(async (resolve, reject) => {
    try {
      let payload = await jwt.verify(token, process.env.HMAC_SECRET_KEY);

      resolve(payload);
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  generateToken,
  verifyToken,
};



