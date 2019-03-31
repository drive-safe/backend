"use strict";

const DriverModel = require("../models/Driver");
const HeroModel = require("../models/Hero");
const CaseModel = require("../models/case")
const hash = require("../utils/hash");
const jwt = require("../utils/jwt");

const { CLIENT } = require("../utils/constants");

const registerHero = async (req, res) => {

  let {
    name,
    email,
    mobile,
    password
  } = req.body;

  try {
    let hero = await HeroModel.findOne({ email: email });

    if (hero) {
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
      location: {
        type: "Point",
        coordinates: [0, 0]
      },
    });

    return res.json({
      status: 200,
      message: "Success, New hero created.",
      data: {
        id: hero.id,
        name: hero.name,
        email: hero.email,
        mobile: hero.mobile
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
    let driver = await DriverModel.findOne({ email: email });
    if (driver) {
      return res.status(400).json({
        status: 400,
        message: "User already exists"
      });
    }
    let hashPassword = await hash.generatePasswordHash(password);
    driver = await DriverModel.create({
      name: name,
      email: email,
      password: hashPassword,
      mobile: mobile,
      status: 0,
      gender: gender,
      location: {
        type: "Point",
        coordinates: [0, 0]
      },
    });

    return res.json({
      status: 200,
      message: "Success, New hero created.",
      data: {
        id: driver.id,
        name: driver.name,
        email: driver.email,
        mobile: driver.mobile,
        gender: driver.gender,
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
    if (parseInt(req.body.client) === CLIENT['HERO']) {
      user = await HeroModel.findOne({ email: req.body.email });
    } else {
      user = await DriverModel.findOne({ email: req.body.email });
    }

    if (!user) {
      return res.status(401).json({
        status: 401,
        message: "Unauthorized. No account exist with that email.",
      });
    }

    let isValidPassword = await hash.comparePasswordHash(
      req.body.password,
      user.password
    );

    if (!isValidPassword) {
      return res.status(401).json({
        status: 401,
        message: "Unauthorized. Invalid Password.",
      });
    }

    const token = await jwt.generateToken({
      id: user.id,
      email: user.email,
      password: user.password,
      client: req.body.client,
    });

    res.cookie("token", token).send({
      status: 200,
      message: "Success. User successfully logged in.",
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        mobile: user.mobile,
        token: token,
        status: user.status,
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

const updateHeroLocation = async (req, res) => {
  try {
    let {
      id,
      latitude,
      longitude
    } = req.body;
    latitude = parseFloat(latitude);
    longitude = parseFloat(longitude);

    let hero = await HeroModel.findOne({ _id: id });

    hero.location = {
      type: "Point",
      coordinates: [longitude, latitude]
    }

    hero.save(err => {
      if (err) {
        return res.json({
          status: 400,
          message: "Something happened.",
        });
      }
      return res.json({
        status: 200,
        message: "Success. Location updated",
        data: {
          id: hero.id,
          location: hero.location
        },
      });
    });
  } catch (e) {
    console.poo(e);

    res.status(500).json({
      status: 500,
      message: "Internal Server Error",
    });
  }
}

const updateDriverLocation = async (req, res) => {
  try {
    let {
      id,
      latitude,
      longitude
    } = req.body;
    latitude = parseFloat(latitude);
    longitude = parseFloat(longitude);

    let driver = await DriverModel.findOne({ _id: id });
    driver.location = {
      type: "Point",
      coordinates: [longitude, latitude]
    }

    driver.save(err => {
      if (err) {
        return res.json({
          status: 400,
          message: "Something happened.",
        });
      }
      return res.json({
        status: 200,
        message: "Success. Location updated",
        data: {
          id: driver.id,
          location: driver.location
        },
      });
    });
  } catch (e) {
    console.poo(e);

    res.status(500).json({
      status: 500,
      message: "Internal Server Error",
    });
  }
}

const getDriverLocation = (req, res) => {
  try {
    let id = req.params.driver;
    let driver = DriverModel.findOne({ id });
    if (!driver) {
      res.status(500).json({
        status: 401,
        message: "User not found",
      });
    }
    let location = driver.location;
    res.status(200).json({
      status: 200,
      message: "Success",
      dats: location.coordinates
    });
  } catch (e) {
    console.poo(e)
    res.status(500).json({
      status: 500,
      message: "Internal Server Error",
    });
  }
}

const getHeroLocation = (req, res) => {
  try {
    let id = req.params.hero;
    let hero = HeroModel.findOne({ id });
    if (!hero) {
      res.status(500).json({
        status: 401,
        message: "User not found",
      });
    }
    let location = hero.location;
    res.status(200).json({
      status: 200,
      message: "Success",
      dats: location.coordinates
    });
  } catch (e) {
    console.poo(e)
    res.status(500).json({
      status: 500,
      message: "Internal Server Error",
    });
  }
}

const getHelp = async (req, res) => {

  try {
    let {
      id,
      latitude,
      longitude
    } = req.body;

    latitude = parseFloat(latitude);
    longitude = parseFloat(longitude);

    let driver = await DriverModel.findOne({ _id: id });
    driver.location = {
      type: "Point",
      coordinates: [longitude, latitude]
    }


    let hero = await HeroModel.findOne({
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [longitude, latitude]
          }
        }
      }
    })

    hero.status = 1;
    
     let Case = await CaseModel.create({
      userId : id,
      heroId : hero.id,
      status: 0,
      startTime : new Date,
    });

    driver.currentCase = Case.id;
    hero.currentCase = Case.id;

    await driver.save(err => {
      if (err) {
        return res.json({
          status: 400,
          message: "Something happened.",
        });
      }
    });

    await hero.save(err => {
      if (err) {
        return res.json({
          status: 400,
          message: "Something happened while changing hero state.",
        });
      }
    });

    return res.json({
      status: 200,
      message: "Success.",
      data: {
        id: Case.id,
        driverId: Case.userId,
        heroId: Case.heroId,
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

const getCaseLocation = async (req, res) => {
  try {

    let {
      id
    } = req.body;

    let hero = await  HeroModel.findOne({
      _id : id,
    });

    let Case = await CaseModel.findOne({
      _id : hero.currentCase
    })

    let driver = await DriverModel.findOne({
      id : Case.driverId
    })

    return res.json({
      status: 200,
      message: "Success.",
      data: {
        id: driver.id,
        latitude: driver.location.coordinates[1],
        longitude: driver.location.coordinates[0],
      },
    });

  } catch(e){
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
  login,
  updateHeroLocation,
  updateDriverLocation,
  getDriverLocation,
  getHeroLocation,
  getHelp,
  getCaseLocation
}
