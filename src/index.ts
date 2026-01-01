import dotenv from 'dotenv';
dotenv.config();
import express  from 'express';
import {connectDB} from './db/db';
import productRoutes from './routes/product-routes';

const app=express();
const PORT =process.env.PORT || 3001;
app.use(express.json());
app.use('/api',productRoutes)

connectDB();
app.listen(PORT,()=>{
    console.log("Server is running...at 3000 port")
})