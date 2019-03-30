const mongoose = require('mongoose');

const locationSchema = {
  type: {
    type: String,
    required: true,
  },
  coordinates: [Number],
}

const schema = {
  name : {
    type: String,
    required: true,
  },
  email : {
    type: String,
    required: true,
  },
  password : {
    type: String,
    required: true
  },
  mobile : {
    type: String,
    required: true,
  },
  location: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'locationSchema',
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

const heroSchema = new mongoose.Schema(schema, options);
module.exports = mongoose.model("Hero", heroSchema);
