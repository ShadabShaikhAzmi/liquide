const express = require("express");
const config = require("dotenv");
const databaseConnect = require("./config/databaseConnection");
const { authRoutes } = require("./routes/auth");
const { tradeRoutes } = require("./routes/trades");
const app = express();
config.config();
databaseConnect();


app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/trade", tradeRoutes);
app.use('*', function(req, res){
    return res
        .status(404)
        .json({ error: true, message: "invalid api" });
})
app.listen(process.env.PORT || 8000, () => {
  console.log(`your server is listening on ${process.env.PORT || 8000}`);
});
