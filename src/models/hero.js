const mongoose = require('mongoose');

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
    required: false,
    type: { type: String },
    coordinates: [],
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
heroSchema.index({ location: "2dsphere" });
module.exports = mongoose.model("Hero", heroSchema);
