const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema(
  {
    address: [{ type: String, required: false }],
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("addresses", addressSchema);
