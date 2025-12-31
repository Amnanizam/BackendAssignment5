import mongoose from "mongoose";
export async function connectDB(){
    console.log("amna")
    try{
        await mongoose.connect(process.env.MONGODB_URI as string);
        console.log("Connect DB successfully");
    }
    catch(error){
        console.error("Error while connection to DB",error)
    }
}