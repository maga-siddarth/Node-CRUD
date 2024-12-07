const express = require("express");
const mongoose = require("mongoose");
const app = express();
app.use(express.json());

const Product = require("./model/productModel");

app.get("/", (req, res) => {
  res.send("Hello from Nodejs Server");
});

//FindProduct
app.get("/api/products", async (req, res) => {
  try {
    const product = await Product.find({});
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({
      message: error.message,
      error: true,
      success: false,
    });
  }
});

//Find One Product

app.get("/api/product/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({
      message: "Unable to get the Product",
      error: true,
      success: false,
    });
  }
});

//Create Product

app.post("/api/products", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({
      message: "Please Check Your Connection",
      error: true,
      success: false,
    });
  }
});

app.put("/api/products/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findByIdAndUpdate(id, req.body);

    if (!product) {
      res.status(400).json({
        message: "Unable to Fetch the Product",
        error: true,
        success: false,
      });
    }

    const updatedProduct = await Product.findById(id);
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({
      message: "Please check your Id",
      error: true,
      success: false,
    });
  }
});

app.delete('/api/products/delete/:id',async(req,res)=>{
    try {
        const {id} = req.params
        const product  = await Product.findByIdAndDelete(id)

        if(!product)
        {
            return res.status(400).json({message : "Product not Deleted"})
        }

       res.send(200).json({message : "Product has been Deleted Successfully"})
    } catch (error) {
        res.send(500).json({
            message : error.message,
            error : true,
            success: false
        })
    }
})

//siddhusiddarth003 - username
//qmzbkKk5rnJxMEUs - password

mongoose
  .connect(
    "mongodb+srv://siddhusiddarth003:qmzbkKk5rnJxMEUs@backenddb.spfcm.mongodb.net/NODE-API?retryWrites=true&w=majority&appName=backendDB"
  )
  .then(() => {
    console.log("Conneted to DB Successfully");
    app.listen(3001, () => {
      console.log("Server Connected Successfully");
    });
  })
  .catch(() => {
    console.log("Connection Failed");
  });
