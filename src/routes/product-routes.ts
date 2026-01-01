import { Router } from "express";
import { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct } from "../controllers/product-controller";

const router = Router();

// CRUD routes
router.post("/", createProduct);           // Create
router.get("/", getAllProducts);          // Get All
router.get("/:id", getProductById);       // Get By ID
router.patch("/:id", updateProduct);      // Update
router.delete("/:id", deleteProduct);     // Delete

export default router;
