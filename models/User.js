const mongoose = require("mongoose");
const autoIncrement = require("mongoose-sequence");

const Schema = mongoose.Schema;
const userSchema = new Schema(
  {
    _id: Number,
    name: {
      type: String,
      required: true,
      immutable: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      immutable: true,
    },
    password: {
      type: String,
      required: true,
    },
    mobile: {
      type: String,
      required: false,
    },
  },
  { _id: false }
);

const autoIncrementId = autoIncrement(mongoose.connection);
userSchema.plugin(autoIncrementId);
const User = mongoose.model("User", userSchema);

module.exports = User;
