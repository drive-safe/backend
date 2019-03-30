const mongoose = require('mongoose');

const schema = {
  userId : {
    type : mongoose.Schema.Types.ObjectId,
    required: true
  },
  heroId : {
    type : mongoose.Schema.Types.ObjectId,
    required: true
  },
  status : {
    type: Number,
    required: true
  },
  startTime : {
    type: Date,
    required: true,
  },
  endTime : {
    type: Date,
    required: false,
  }
};

const options = {
  autoCreate: true,
};

const caseSchema = new mongoose.Schema(schema, options);

module.exports = mongoose.model("Case", caseSchema);