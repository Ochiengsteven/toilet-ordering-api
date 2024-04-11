const express = require('express');
const mongoose = require('mongoose');
const app = express();

const PORT = 3000;

// Encode the password before inserting it into the connection string
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

app.get('/', (req, res) => {
  res.send('Hello my App!');
});
