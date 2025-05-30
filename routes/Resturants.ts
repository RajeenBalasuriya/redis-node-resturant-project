import express from 'express';
import { validate } from '../middlewares/validate.js';
import { ResturantSchema ,type Resturant} from '../schemas/resturants.js';
import { intializeRedisClient } from '../utils/client.js';
import { nanoid } from 'nanoid';
import { getRestaurantKey } from '../utils/keys.js';


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
    }catch(err){
        next(err);
    }

    res.send("List of Restaurants");
})

export default router;