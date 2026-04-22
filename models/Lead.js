const mongoose = require("mongoose");

const LeadSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: String,

  source: String,
  notes: String,
  followUp: Date,   // ✅ CHANGED (only this line)

  status: {
    type: String,
    default: "New"
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Lead", LeadSchema);