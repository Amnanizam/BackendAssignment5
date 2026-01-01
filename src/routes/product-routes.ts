import {Router} from 'express';
import {getAllProducts,getProductByID,createProduct,updateProduct,patchProduct,deleteProduct} 
from "../controllers/product-controller"

const productRoutes=Router();
productRoutes.get('/products',getAllProducts);
productRoutes.get('/products/:id',getProductByID);
productRoutes.post('/createproduct',createProduct)
productRoutes.put('/updateproduct/:id',updateProduct)
productRoutes.patch('/partialUpdate/:id',patchProduct)
productRoutes.delete('/deleteProd/:id',deleteProduct)


export default productRoutes;