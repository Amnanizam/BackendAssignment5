import z from "zod";

export const ProductBodySchema = z.object({
  name: z.string().min(3, "Length must be three or more"),
  price: z.number().min(0, "Must be grater than zero"),
  category: z.string(),
  inStock: z.boolean(),
  tags: z.array(z.string())
});

const productParam = z.object({
  id: z.string()
});
