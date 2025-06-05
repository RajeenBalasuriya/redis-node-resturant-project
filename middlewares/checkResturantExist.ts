import type { Request,Response,NextFunction } from "express";
import { intializeRedisClient } from '../utils/client.js';
import { getRestaurantKey } from '../utils/keys.js';
import { errorResponse } from "../utility/responses.js";


interface Params {
  resturantid: string;
}

export const checkResturantExists=async(req:Request<Params>,res:Response,next:NextFunction)=>{
    const { resturantid } = req.params;
    

    
    if(!resturantid){
        errorResponse(res,400,"Resturant ID Not Found");
        return;
    }
    const client = await intializeRedisClient();
    const resturantKey = getRestaurantKey(resturantid);
    //check a particular key exists in redis db 
    const exists = await client.exists(resturantKey);

    if(!exists){ 
         errorResponse(res,404,"Resturant Not Found")
         return;
    }
    next();


}