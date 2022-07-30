const { Router } = require("express");
const {
  createTrade,
  getAllTrade,
  getTrade,
  deleteTrade,
} = require("../controller/tradesController");
const { authorization } = require("../middleware/verifyTrustToken");

const tradeRoutes = Router();

tradeRoutes.post("/", authorization,createTrade);
tradeRoutes.get("/", authorization, getAllTrade);
tradeRoutes.get("/:id", authorization, getTrade);
tradeRoutes.delete("/:id", authorization, deleteTrade);

module.exports = {
  tradeRoutes,
};
