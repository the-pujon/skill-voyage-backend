const express = require("express");
const cors = require("cors");
require("./src/config/db")



const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Home page
app.get("/", (req, res) => {
  res.status(200).sendFile(__dirname + "/./view/index.html");
});



//route not found error
app.use((req, res, next) => {
  res.status(404).json({
    message: "route not found",
  });
});

//handling server error
app.use((err, req, res, next) => {
  res.status(500).json({
    message: "Something broke",
  });
});

module.exports = app;