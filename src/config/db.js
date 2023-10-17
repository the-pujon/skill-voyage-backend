const mongoose = require("mongoose");
const config = require("./config");


mongoose
  .connect(config.db.dbURL)
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.error(`Database is not connected. error message: ${err}`);
  })
