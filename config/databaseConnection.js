const mongoose = require("mongoose");

module.exports = databaseConnect = () => {
  const connectionParams = { useNewUrlParser: true };
  mongoose.connect(process.env.DB_URL, connectionParams);

  mongoose.connection.on("connected", () => {
    console.log(`Database is running on port ${mongoose.connection.port}`);
  });

  mongoose.connection.on("error", (err) => {
    console.log(`Error while connecting to database : ${err}`);
  });

  mongoose.connection.on("disconnected", () => {
    console.log(`Mongodb connection disconnected`);
  });
};
