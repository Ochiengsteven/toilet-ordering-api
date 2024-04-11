const express = require('express');
const mongoose = require('mongoose');
const Product = require('./models/product.model.js');
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

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello my App!');
});

app.post('/api/products', async(req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).send('Product was not created. An error occurred.');
  }
});

app.get('/api/products', async(req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
});

app.get('/api/product/:id', async(req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
});

app.put('/api/product/:id', async(req, res) => {
  try {
    const {id} = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body)

    if (!product) {
      return res.status(404).json({message: 'Product not found.'});
    }

    const updatedProduct = await Product.findById(id);
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
});
