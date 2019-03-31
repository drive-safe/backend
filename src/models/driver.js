const mongoose = require('mongoose');



const schema = {
  name : {
    type: String,
    required: true,
  },
  email : {
    type: String,
    required: true,
    match: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  },
  password : {
    type: String,
    required: true
  },
  mobile : {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  location: {
    type: { type: String },
    coordinates: []
   },
  status : {
    type: Number,
    required: true
  },
  fcmToken : {
    type: String,
    required: false
  },
  currentCase : {
    type : mongoose.Schema.Types.ObjectId,
    required: false
  }
};

const options = {
  autoCreate: true,
};

const driverSchema = new mongoose.Schema(schema, options);
driverSchema.index({ location: "2dsphere" });
module.exports = mongoose.model("Driver", driverSchema);
