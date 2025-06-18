import express from 'express';
import type { Request,Response } from 'express';
import { validate } from '../middlewares/validate.js';
import { ResturantSchema ,type Resturant} from '../schemas/resturants.js';
import { intializeRedisClient } from '../utils/client.js';
import { nanoid } from 'nanoid';
import { getRestaurantKey } from '../utils/keys.js';
import { sucessResponse } from '../utility/responses.js';
import { checkResturantExists } from '../middlewares/checkResturantExist.js';
import { ReviewSchema } from '../schemas/review.js';
import type { Params } from '../interfaces/params.interface.js';
const router = express.Router();

router.post("/",validate(ResturantSchema),async(req,res,next)=>{
    const data =req.body as Resturant;
    try{
        const client = await intializeRedisClient();
        const id = nanoid();
        const resturantKey = getRestaurantKey(id);
        const hashData = {id , name:data.name,location:data.location};
        const addResult = await client?.hSet(resturantKey,hashData);
        console.log(`Added restaurant with ID: ${id}, Result: ${addResult}`);
        //return success response
        sucessResponse(res,hashData,"Restaurant added successfully");
    }catch(err){
        next(err);
    }

})

router.post("/:resturantId/reviews",checkResturantExists,validate(ReviewSchema),async(req:Request<Params>,res:Response)=>{
    const {resturantId}=req.params
})

router.get("/:resturantid",checkResturantExists,async(req,res,next)=>{
        const resturantId=req.params.resturantId;

        try{

            const client = await intializeRedisClient();
            const resturantKey = getRestaurantKey(resturantId);
            const [viewCount,resturant]=await Promise.all([client.hIncrBy(resturantKey,"viewCount",1),client.hGetAll(resturantKey)])
           
            sucessResponse(res,resturant);

        }catch(err){
            next(err)
        }
        
            
   
})


export default router;