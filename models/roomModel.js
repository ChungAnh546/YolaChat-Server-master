const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    roomName: {
      type: String,
      required: true,
      min: 3,
      max: 20,
      unique: true,
    },
    manager:{
        type:mongoose.Schema.Types.ObjectId,
        required: true,
    },
    members:Array,
    blockChat:Array,
  },
  {
    timestamps: true,
  }
  );
  
  module.exports = mongoose.model("Rooms", userSchema);