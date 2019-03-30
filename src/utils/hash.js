"use strict";

const bcrypt = require("bcrypt");

const SALT_ROUNDS = 10;

const generatePasswordHash = (password) => {
	return new Promise(async (resolve, reject) => {
		try {
			let hash = await bcrypt.hash(password, SALT_ROUNDS);
			resolve(hash)
		} catch(e) {
			reject(e);
		}
	});
}

const comparePasswordHash = (password, hash) => {
	return new Promise(async (resolve, reject) => {
		try {
			let match = await bcrypt.compare(password, hash);
			resolve(match);
		} catch(e) {
			reject(e);
		}	
	});
}

module.exports = {
	generatePasswordHash,
	comparePasswordHash
};
