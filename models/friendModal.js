const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
        friendId: Array,
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Friends", userSchema);
