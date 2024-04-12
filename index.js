require('dotenv').config();

const express = require("express");
const mongoose = require("mongoose");
const productRoute = require("./routes/product.route.js");
const userRoute = require("./routes/user.route.js");
const jwtMiddleware = require("./middleware/jwtMiddleware.js");
const cors = require("cors");
const app = express();

const PORT = 3000;

// Encoded password
const password = encodeURIComponent("Ny@t1ndo");

mongoose
  .connect(
    `mongodb+srv://admin:${password}@backenddb.p3hflbt.mongodb.net/Node-API?retryWrites=true&w=majority&appName=BackendDB`
  )
  .then(() => {
    console.log("Connected to database!");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Connection failed!", err);
  });

// Middleware
app.use(express.json());
app.use(cors());

// User Routes
app.use("/api/users", userRoute);

// Product Routes with Authentication Middleware
app.use("/api/products", jwtMiddleware, productRoute);

app.get("/", (req, res) => {
  res.send("Hello my App!");
});
