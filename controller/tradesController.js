const {
  createTradeBodyValidation,
} = require("./../validation/requestValidation");
const Trade = require("./../models/Trade");

// create Trade
const createTrade = async (req, res, next) => {
  try {
    const { error } = createTradeBodyValidation(req.body);
    if (error) {
      return res
        .status(400)
        .json({ error: true, message: error.details[0].message });
    }
    const { type, symbol, shares, price } = req.body;
    const data = await new Trade({
      _id: (await Trade.countDocuments()) + 1,
      user_id: req.user._id,
      type,
      symbol,
      shares,
      price,
    }).save();
    if (data) {
      return res.status(201).json({ error: false, data: data });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
};

// get all or filter trade
const getAllTrade = (req, res) => {
  try {
    const user_id = req.query.user_id;
    const type = req.query.type;
    const query = {};

    if (user_id) {
      query.user_id = user_id;
    }
    if (type) {
      query.type = type;
    }

    Trade.find(query).exec(function (err, response) {
      if (err) {
        return res.status(400).json({ error: true, message: err });
      }
      return res.status(200).json({ error: false, data: response });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
};

// get single trade
const getTrade = (req, res) => {
  try {
    Trade.findById(req.params.id).exec(function (err, response) {
      if (err) {
        return res.status(400).json({ error: true, message: err });
      }
      if (response) {
        return res.status(200).json({ error: false, data: response });
      } else {
        return res.status(404).json({ error: true, data: "Not found" });
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
};

// delete trade
const deleteTrade = async (req, res) => {
  try {
    return res.status(405).json({
      error: true,
      data: "API does not allow deleting or modifying trades",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
};

module.exports = {
  createTrade,
  getAllTrade,
  getTrade,
  deleteTrade,
};
