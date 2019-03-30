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
    latitude : {
      type: String,
      required: false,
    },
    longitude : {
      type: String,
      required: false,
    }
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
