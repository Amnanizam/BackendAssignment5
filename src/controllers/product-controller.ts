import { Request, Response } from "express";
import ProductModel from "../models/product-model";
import { ProductBodySchema, GetAllProductsSchema, GetProductByIdSchema, PatchProductSchema, DeleteProductSchema } from "../schemas";

// Create Product
export const createProduct = async (req: Request, res: Response) => {
  try {
    const parse = ProductBodySchema.safeParse(req.body);
    if (!parse.success) {
      return res.status(400).json({ success: false, message: parse.error.issues[0].message });
    }

    const product = await ProductModel.create(parse.data);
    res.status(201).json({ success: true, message: "Product created successfully!", data: product });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error: " + error });
  }
};

// Get All Products
export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const parse = GetAllProductsSchema.safeParse(req.query);
    if (!parse.success) {
      return res.status(400).json({ success: false, message: parse.error.issues[0].message });
    }

    const { page = 1, limit = 10, sortBy, filter } = parse.data;
    const query: any = {};
    if (filter?.category) query.category = filter.category;
    if (filter?.inStock !== undefined) query.inStock = filter.inStock;

    const products = await ProductModel.find(query)
      .sort(sortBy ? { [sortBy]: 1 } : {})
      .skip((page - 1) * limit)
      .limit(limit);

    res.status(200).json({ success: true, message: "Products fetched successfully!", data: products });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error: " + error });
  }
};

// Get Product By ID
export const getProductById = async (req: Request, res: Response) => {
  try {
    const parse = GetProductByIdSchema.safeParse(req.params);
    if (!parse.success) {
      return res.status(400).json({ success: false, message: parse.error.issues[0].message });
    }

    const product = await ProductModel.findById(parse.data.id);
    if (!product) return res.status(404).json({ success: false, message: "Product not found" });

    res.status(200).json({ success: true, message: "Product fetched successfully!", data: product });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error: " + error });
  }
};

// Update Product
export const updateProduct = async (req: Request, res: Response) => {
  try {
    const parse = PatchProductSchema.safeParse({ id: req.params.id, updates: req.body });
    if (!parse.success) {
      return res.status(400).json({ success: false, message: parse.error.issues[0].message });
    }

    const updated = await ProductModel.findByIdAndUpdate(parse.data.id, parse.data.updates, { new: true });
    if (!updated) return res.status(404).json({ success: false, message: "Product not found" });

    res.status(200).json({ success: true, message: "Product updated successfully!", data: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error: " + error });
  }
};

// Delete Product
export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const parse = DeleteProductSchema.safeParse(req.params);
    if (!parse.success) {
      return res.status(400).json({ success: false, message: parse.error.issues[0].message });
    }

    const deleted = await ProductModel.findByIdAndDelete(parse.data.id);
    if (!deleted) return res.status(404).json({ success: false, message: "Product not found" });

    res.status(200).json({ success: true, message: "Product deleted successfully!", data: deleted });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error: " + error });
  }
};
