//add product
import productModel from "../models/productModel.js";
import cloudinary from "../config/cloudinary.js";

const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      bestSeller,
      sizes,
      specifications,
      date,
    } = req.body;

    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "Image file is required." });
    }

    const result = await cloudinary.uploader.upload(req.file.path, {
      resource_type: "image",
    });

    const img_url = result.secure_url;

    console.log("Raw Specifications:", specifications);

    let parsedSizes = [];
    let parsedSpecifications = {};

    try {
      parsedSizes = JSON.parse(sizes || "[]");
    } catch (error) {
      console.error("Error parsing sizes:", error.message);
      return res
        .status(400)
        .json({ success: false, message: "Invalid sizes format." });
    }

    try {
      parsedSpecifications = JSON.parse(specifications || "{}");
    } catch (error) {
      console.error("Error parsing specifications:", error.message);
      return res
        .status(400)
        .json({ success: false, message: "Invalid specifications format." });
    }

    const newProduct = {
      name,
      description,
      price: Number(price),
      image: img_url,
      category,
      bestSeller: bestSeller === "true" ? true : false,
      sizes: parsedSizes,
      date: date || Date.now(),
      specifications: parsedSpecifications,
    };

    const product = new productModel(newProduct);
    await product.save();

    res.status(201).json({
      success: true,
      message: "Product added successfully!",
      product: newProduct,
    });
  } catch (error) {
    console.error("Error adding product:", error);
    res.json({ success: false, message: error.message });
  }
};

// list product
const listProduct = async (req, res) => {
  try {
    const products = await productModel.find({});
    res.json({ success: true, products });
  } catch (error) {
    console.error("Error adding product:", error);
    res.json({ success: false, message: error.message });
  }
};

//delete product
const deleteProduct = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Product removed" });
  } catch (error) {
    console.error("Error adding product:", error);
    res.json({ success: false, message: error.message });
  }
};

//single product info
const singleProduct = async (req, res) => {
  try {
    const { productId } = req.body;
    const product = await productModel.findById(productId);
    res.json({ success: true, product });
  } catch (error) {
    console.error("Error adding product:", error);
    res.json({ success: false, message: error.message });
  }
};

//edit product
const editProduct = async (req, res) => {
  try {
    const { id, name, description, price, category, bestSeller, sizes, specifications } = req.body;

    let img_url = null;
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, { resource_type: "image" });
      img_url = result.secure_url;
    }

    let parsedSizes = [];
    let parsedSpecifications = {};

    try {
      parsedSizes = JSON.parse(sizes || "[]");
    } catch (error) {
      return res.status(400).json({ success: false, message: "Invalid sizes format." });
    }

    try {
      parsedSpecifications = JSON.parse(specifications || "{}");
    } catch (error) {
      return res.status(400).json({ success: false, message: "Invalid specifications format." });
    }

    const updatedProduct = await productModel.findByIdAndUpdate(
      id,
      {
        name,
        description,
        price: Number(price),
        category,
        bestSeller: bestSeller === "true",
        sizes: parsedSizes,
        specifications: parsedSpecifications,
        ...(img_url && { image: img_url }),
      },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ success: false, message: "Product not found." });
    }

    res.json({ success: true, message: "Product updated successfully!", product: updatedProduct });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};


export { addProduct, listProduct, deleteProduct, singleProduct, editProduct };
