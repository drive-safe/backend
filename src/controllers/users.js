"use strict";

const DriverModel = require("../models/Driver");
const HeroModel = require("../models/Hero");
const hash = require("../utils/hash");
const jwt = require("../utils/jwt");

const { CLIENT } = require("../utils/constants");

const registerHero = async (req, res) => {

  let {
    name,
    email,
    mobile,
    gender,
    password
  } = req.body;

  try {
    let hero = await HeroModel.findOne({ email: email });

    if(hero){
      return res.status(400).json({
        status: 400,
        message: "User already exists"
      });
    }

    let hashPassword = await hash.generatePasswordHash(password);

    hero = await HeroModel.create({
      name: name,
      email: email,
      password: hashPassword,
      mobile: mobile,
      status: 0,
    });

    return res.json({
      status: 200,
      message: "Success, New hero created.",
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        mobile: user.mobile
      },
    });
  } catch (e) {
    console.poo(e);

    return res.status(500).json({
      status: 500,
      message: "Internal Server Error",
    });
  }
};

const registerDriver = async (req, res) => {

  let {
    name,
    email,
    mobile,
    gender,
    password
  } = req.body;

  try {
    let hero = await DriverModel.findOne({ email: email });

    if(hero){
      return res.status(400).json({
        status: 400,
        message: "User already exists"
      });
    }

    let hashPassword = await hash.generatePasswordHash(password);

    hero = await HeroModel.create({
      name: name,
      email: email,
      password: hashPassword,
      mobile: mobile,
      status: 0,
      gender: gender
    });

    return res.json({
      status: 200,
      message: "Success, New hero created.",
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        mobile: user.mobile,
        gender: user.gender,
      },
    });
  } catch (e) {
    console.poo(e);

    return res.status(500).json({
      status: 500,
      message: "Internal Server Error",
    });
  }
};

const login = async (req, res) => {
  try {
    if (!req.body.email || !req.body.password) {
      return res.status(400).json({
        status: 400,
        message: "Bad Request. Invalid request body.",
      });
    }
    
    let user;
    if(req.body.client === CLIENT['HERO']) {
      user = await HeroModel.findOne({ email: req.body.email });  
    } else {
      user = await DriverModel.findOne({ email: req.body.email });  
    }

    if (!user) {
      return res.status(401).json({
        status: 401,
        message : "Unauthorized. No account exist with that email.",
      });
    }

    let isValidPassword = await hash.comparePasswordHash(
      req.body.password,
      user.password
    );

    if (!isValidPassword) {
      return res.status(401).json({
        status: 401,
        message : "Unauthorized. Invalid Password.",
      });
    }

    const token = await jwt.generateToken({
      id: user.id,
      email: user.email,
      password: user.password,
      client: req.body.client,
    });

    res.cookie("token", token).json({
      status: 200,
      message: "Success. User successfully logged in.",
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        mobile: user.mobile,
        token: token,
      },
    });
  } catch (e) {
    console.poo(e);

    res.status(500).json({
      status: 500,
      message: "Internal Server Error",
    });
  }
}

module.exports = {
  registerHero,
  registerDriver,
  login
}
