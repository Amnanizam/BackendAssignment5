import mongoose, { Schema, model, Document } from "mongoose";

export interface IProduct extends Document {
  name: string;
  price: number;
  category: "clothes" | "shoes" | "mobile" | "abaya";
  inStock: boolean;
  tags: string[];
  description?: string;
  stockQuantity?: number;
  brand?: string;
  rating?: number;
}

const productSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true, minlength: 3 },
    price: { type: Number, required: true, min: 0 },
    category: { type: String, required: true, enum: ["clothes", "shoes", "mobile", "abaya"] },
    inStock: { type: Boolean, required: true },
    tags: { type: [String], required: true },
    description: { type: String },
    stockQuantity: { type: Number, min: 0 },
    brand: { type: String },
    rating: { type: Number, min: 0, max: 5 },
  },
  { timestamps: true }
);

const ProductModel = model<IProduct>("Product", productSchema);

export default ProductModel;
