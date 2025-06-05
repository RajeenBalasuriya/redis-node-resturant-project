import express from 'express';
import type { RequestHandler } from 'express';
import { validate } from '../middlewares/validate.js';
import { ResturantSchema ,type Resturant} from '../schemas/resturants.js';
import { intializeRedisClient } from '../utils/client.js';
import { nanoid } from 'nanoid';
import { getRestaurantKey } from '../utils/keys.js';
import { sucessResponse } from '../utility/responses.js';
import { checkResturantExists } from '../middlewares/checkResturantExist.js';



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

router.get("/:resturantid",checkResturantExists,async(req,res,next)=>{
        const resturantId=req.params.resturantid;

        try{

            const client = await intializeRedisClient();
            const resturantKey = getRestaurantKey(resturantId);
            const resturant = await client?.hGetAll(resturantKey);
           
            sucessResponse(res,resturant);

        }catch(err){
            next(err)
        }
        
            
   
})


export default router;