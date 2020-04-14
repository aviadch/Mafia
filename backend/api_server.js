// import express (after npm install express)
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

// create new express app and save it as "app"
const app = express();
app.use(bodyParser.json());

const corsOptions = {
  origin: "http://localhost:3000",
};
app.use(cors(corsOptions));

// server configuration
const PORT = 8080;

// create a route for the app
app.get("/", (req, res) => {
  res.send("please go to one of the routes available");
});

// make the server listen to requests
app.listen(PORT, () => {
  console.log(`Server running at: http://localhost:${PORT}/`);
});

module.exports = { app };

require("./routes");
