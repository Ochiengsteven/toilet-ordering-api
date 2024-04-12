const express = require("express");
const mongoose = require("mongoose");
const productRoute = require("./routes/product.route.js");
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

// Routes
app.use("/api/products", productRoute);

app.get("/", (req, res) => {
  res.send("Hello my App!");
});
