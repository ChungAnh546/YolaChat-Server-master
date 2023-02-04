const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        received: {
            type: String,
            required: true,
        },
        senderId: {
            type: String,
            required: true,
        },
        agreed: {
            type: Boolean,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Friend Request", userSchema);
