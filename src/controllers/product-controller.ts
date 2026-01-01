import { Request, Response } from "express";
import productModel from "../models/product-model";

interface ReqBody {
    title: string;
    description: string;
    price: number;
    quantity: number;
    category: string[];
}

interface Payload {
    title?: string;
    description?: string;
    price?: number;
    quantity?: number;
    category?: string[];
}


export async function createProduct(
    req: Request<{}, {}, ReqBody>,
    res: Response
) {
    try {
        const { title, description, price, quantity } = req.body;

        if (!title || !description || price === undefined || quantity === undefined) {
            return res.status(400).json({
                success: false,
                message: "All fields are required!",
            });
        }

        const product = new productModel(req.body);
        const newProduct = await product.save();

        return res.status(200).json({
            success: true,
            message: "Product created successfully!",
            data: newProduct,
        });
    } catch (error: any) {
        if (error.name === "ValidationError") {
            return res.status(400).json({
                success: false,
                message: error.message,
            });
        }
        return res.status(500).json({
            success: false,
            message: "Internal server error: " + error,
        });
    }
}


export async function getAllProducts(req: Request, res: Response) {
    try {
        const productList = await productModel.find();
        if (productList.length === 0) {
            return res.status(200).json({
                success: true,
                message: "No products found",
                data: []
            });
        }
        res.status(200).json({
            success: true,
            message: "Products retrieved successfully",
            data: productList,
        });
    } catch (error) {


        res.status(500).json({
            success: false,
            message: "Internal server error: " + error,
        });
    }
}

export async function getProductByID(
    req: Request<{ id: string }>,
    res: Response
) {
    try {
        const { id } = req.params;
        const product = await productModel.findById(id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Product retrieved successfully",
            data: product,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error: " + error,
        });
    }
}


export async function updateProduct(
    req: Request<{ id: string }, {}, ReqBody>,
    res: Response
) {
    try {
        const isProductFound = await productModel.findById(req.params.id);

        if (!isProductFound) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        const updatedProduct = await productModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        res.status(200).json({
            success: true,
            message: "Product updated successfully",
            data: updatedProduct,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error: " + error,
        });
    }
}


export async function patchProduct(
    req: Request<{ id: string }, {}, Partial<ReqBody>>,
    res: Response
) {
    try {
        const updatedProduct = await productModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Product updated successfully",
            data: updatedProduct,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error: " + error,
        });
    }
}


export async function deleteProduct(
    req: Request<{ id: string }>,
    res: Response
) {
    try {
        const deletedProduct = await productModel.findByIdAndDelete(req.params.id);

        if (!deletedProduct) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Product deleted successfully",
            data: deletedProduct,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error: " + error,
        });
    }
}
