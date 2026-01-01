import mongoose from "mongoose";
import {ProductTypes} from '../types/product-types';

const productSchema=new mongoose.Schema<ProductTypes>(
    {
       title:{type:String,required:true,trim:true},
       description:{type:String,required:true},
       price:{type:Number,required:true,min: [0, "Quantity cannot be negative"] },
       quantity:{type:Number,required:true,min: [0, "Quantity cannot be negative"] },
       category:{type:[String],default:[]}

    },{
        timestamps:true
    }
    
)
export default mongoose.model<ProductTypes>("Product",productSchema);