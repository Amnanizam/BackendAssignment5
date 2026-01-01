import z from "zod";

//createproduct
export const ProductBodySchema = z.object({
  name: z.string().min(3, "Length must be three or more"),
  price: z.number().min(0, "Must be greater than zero"),
  category: z.enum(["clothes", "shoes", "mobile", "abaya"], "Invalid category"),
  inStock: z.boolean(),
  tags: z.array(z.string()),
  description:z.string(),
  stockQuantity:z.number().min(0,"Stock quantity must be non-negative"),
  brand:z.string(),
  rating:z.number().min(0, "Rating must be between 0 and 5").max
  (5, "Rating must be between 0 and 5")
});

const productParam = z.object({
  id: z.string()
});


export const ProductSchema = z.object({
  name: z.string().min(3, "Name must be 3 or more characters"),
  price: z.number().min(0, "Price must be greater than or equal to zero"),
  category: z.enum(["clothes", "shoes", "mobile", "abaya"], "Invalid category"),
  inStock: z.boolean(),
  tags: z.array(z.string()),
  description: z.string().optional(),
  stockQuantity: z.number().min(0, "Stock quantity must be non-negative").optional(),
  brand: z.string().optional(),
  rating: z.number().min(0, "Rating must be between 0 and 5").max
  (5, "Rating must be between 0 and 5").optional()
  });

  //getallproducts
  export const GetAllProductsSchema = z.object({
  page: z.number().min(1, "Page must be at least 1").optional(),
  limit: z.number().min(1, "Limit must be at least 1").optional(),
  sortBy: z.string().optional(),
  filter: z.object({
    category: z.string().optional(),
    inStock: z.boolean().optional()
  }).optional()
});

//getproductbyid
export const GetProductByIdSchema = z.object({
  id: z.string().min(1, "Product ID is required")
});

//updateproduct
export const PatchProductSchema = z.object({
  id: z.string().min(1, "Product ID is required"),
  updates: z.object({
    name: z.string().min(3, "Name must be 3 or more characters").optional(),
    price: z.number().min(0, "Price must be greater than or equal to zero").optional(),
    category: z.enum(["clothes", "shoes", "mobile", "abaya"], "Invalid category").optional(),
    inStock: z.boolean().optional(),
    tags: z.array(z.string()).optional(),
    description: z.string().optional(),
  stockQuantity: z.number().min(0, "Stock quantity must be non-negative").optional(),
  brand: z.string().optional(),
  rating: z.number().min(0, "Rating must be between 0 and 5").max
  (5, "Rating must be between 0 and 5").optional()
  }).optional()
});

//deleteproduct
export const DeleteProductSchema = z.object({
  id: z.string().min(1, "Product ID is required")
});