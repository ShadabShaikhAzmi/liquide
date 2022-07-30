const mongoose = require("mongoose");
require('@mongoosejs/double');
const Schema = mongoose.Schema;

const TradeSchema = new Schema({
  _id: Number,
  type: {
    type: String,
    required: true,
    immutable: true,
  },
  user_id: { type: Schema.Types.Number, required: true, immutable: true },
  symbol: {
    type: String,
    required: true,
    immutable: true,
  },
  shares: {
    type: Number,
    required: true,
    immutable: true,
  },
  price: {
    type:  mongoose.Schema.Types.Double,
    required: true,
    immutable: true,
  },
  timestamp: { type: Number, default: Date.now, immutable: true }
});

const Trade = mongoose.model("Trade", TradeSchema);

module.exports = Trade;
