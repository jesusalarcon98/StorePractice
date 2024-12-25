import Product from "../models/product.js";
import mongoose from "mongoose";

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({})
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.log("Error in fetching products", error.message)
    res.status(500).json({ message: "Server Error" });
  }
}

export const createProduct = async (req, res) => {
  const product = req.body;
  if (!product.name || !product.price || !product.image) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const newProduct = new Product(product);

  try {
    await newProduct.save();
    res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    console.error("Error in create product", error.message);
    res.status(500).json({ message: "Server Error" });
  }
}

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const product = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "Product not found" });
  }

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, product, { new: true });
    console.log(updatedProduct)
    res.status(200).json({ success: true, data: updatedProduct })
  } catch (error) {
    res.status(500).json({ message: "Server error" })
  }
}

export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    await Product.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Product deleted" });
  }
  catch (error) {
    console.log("Error in delete product", error.message);
    res.status(404).json({ success: false, message: "Product not found" });
  }
}