const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const Product = require("./models/product");

const mongoose = require("mongoose");
mongoose
  .connect("mongodb://<user>:<password>@<host>:<port>/<db_name>", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connexion à MongoDB réussie");
  })
  .catch(() => {
    console.log("Echec de la connexion à MongoDB");
  });

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get("/api/products", (req, res) => {
  Product.find()
    .then(products => {
      res.status(200).json({ products });
    })
    .catch(error => {
      res.status(400).json({ error });
    });
});

app.post("/api/products", (req, res) => {
  const product = new Product({
    ...req.body
  });
  product
    .save()
    .then(product => {
      res.status(201).json({ product });
    })
    .catch(error => {
      res.status(400).json({ error });
    });
});

app.get("/api/products/:id", (req, res) => {
  Product.findById(req.params.id)
    .then(product => {
      res.status(200).json({ product });
    })
    .catch(error => {
      res.status(404).json({ error });
    });
});

app.put("/api/products/:id", (req, res) => {
  Product.updateOne({ _id: req.params.id }, { ...req.body })
    .then(product => {
      res.status(200).json({ message: "Modified!" });
    })
    .catch(error => {
      res.status(400).json({ error });
    });
});

app.delete("/api/products/:id", (req, res) => {
  Product.deleteOne({ _id: req.params.id })
    .then(product => {
      res.status(200).json({ message: "Deleted!" });
    })
    .catch(error => {
      res.status(400).json({ error });
    });
});

module.exports = app;
