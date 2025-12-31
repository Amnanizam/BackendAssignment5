import {Request,Response, NextFunction} from 'express';

interface AppError{
    message?:string;
    status?:number;

}

const error=(err:AppError,req:Request,res:Response,next:NextFunction)=>{
console.error("Error:" + err.message)
 res.status(err.status||500).json({
    success:false,
    message:err.message || "something went wrong!"

 })
};
export default error;