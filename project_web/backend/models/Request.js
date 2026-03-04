const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  type: String,
  detail: String,
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending"   // 👈 สำคัญมาก
  }
}, { timestamps: true });

module.exports = mongoose.model("Request", requestSchema);