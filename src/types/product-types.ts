import mongoose, { Document } from "mongoose";

export interface ProductTypes extends Document {
  title: string;
  description: string;
  price: number;
  quantity: number;
  category: string[]; // array of category names
  
}


const productSchema = new mongoose.Schema<ProductTypes>(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    quantity: { type: Number, required: true, min: 0 },
    category: { type: [String], default: [] }
  },
  {
    timestamps: true
  }
);

// 3️⃣ Export model
export default mongoose.model<ProductTypes>("Product", productSchema);
