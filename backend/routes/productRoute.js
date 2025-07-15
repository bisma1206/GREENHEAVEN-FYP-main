import express from "express";
import {
  addProduct,
  deleteProduct,
  singleProduct,
  listProduct,
  editProduct,
} from "../controllers/productController.js";
import upload from "../middleware/multer.js";
import adminAuth from "../middleware/adminAuth.js";

const productRoute = express.Router();

productRoute.post("/add", adminAuth , upload.single("image"), addProduct);
productRoute.post("/remove", adminAuth, deleteProduct);
productRoute.post("/single", singleProduct);
productRoute.get("/list", listProduct);
productRoute.put("/edit", adminAuth, upload.single("image"), editProduct);

export default productRoute;
