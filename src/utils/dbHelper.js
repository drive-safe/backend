"use strict";

const mongoose = require("mongoose");

class Database {
	constructor() {
		this._ip = process.env.MONGODB_IP || "127.0.0.1";
		this._port = process.env.MONGODB_PORT;
		this._host = this._ip + ":" + this._port;
		this._uri = "mongodb://" + this._host;
		this.options = {
			useNewUrlParser: true,
			dbName: process.env.MONGODB_DATABASE,
		};

		this._connect();
	}

	_connect() {
		mongoose.connect(this._uri, this.options);
		console.tick("Database connection successful");
	}

	closeConnection() {
		return new Promise((resolve, reject) => {
			try {
				mongoose.connection.close(() => {
					resolve();
				})
			} catch (e) {
				reject(e);
			}
		});
	}
}

module.exports = new Database();