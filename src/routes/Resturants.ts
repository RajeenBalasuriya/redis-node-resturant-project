import express from 'express';
import type { Request,Response } from 'express';
import { validate } from '../middlewares/validate.js';
import { ResturantSchema ,type Resturant} from '../schemas/resturants.js';
import { intializeRedisClient } from '../utils/client.js';
import { nanoid } from 'nanoid';
import { getRestaurantKey, reviewDetailsById, reviewKeyById } from '../utils/keys.js';
import { errorResponse, sucessResponse } from '../utility/responses.js';
import { checkResturantExists } from '../middlewares/checkResturantExist.js';
import { ReviewSchema, type Review } from '../schemas/review.js';
import type { Params } from '../interfaces/params.interface.js';
import { timeStamp } from 'console';
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

router.post("/:resturantId/reviews",checkResturantExists,validate(ReviewSchema),async(req:Request<Params>,res:Response,next)=>{
    const {resturantId}=req.params
    const data = req.body as Review;
    try{
        const client = await intializeRedisClient();
        const reviewId = nanoid();
        const reviewKey =reviewKeyById(resturantId);
        const reviewDetailsKey= reviewDetailsById(reviewId);

        const reviewData = {id:reviewId,...data,timeStamp:Date.now(),resturantId}

        await Promise.all([client.lPush(reviewKey,reviewId),
            client.hSet(reviewDetailsKey,reviewData)
        ]);

        sucessResponse(res,reviewData,"Review Added")

    }catch(err){
        next(err)
    }

})

router.delete(
  "/:restaurantId/reviews/:reviewId",
  checkResturantExists,
  async (
    req: Request<{ restaurantId: string; reviewId: string }>,
    res,
    next
  ) => {
    const { restaurantId, reviewId } = req.params;

    try {
      const client = await intializeRedisClient();
      const reviewKey = reviewKeyById(restaurantId);
      const reviewDetailsKey = reviewDetailsById(reviewId);
      const [removeResult, deleteResult] = await Promise.all([
        client.lRem(reviewKey, 0, reviewId),
        client.del(reviewDetailsKey),
      ]);
      if (removeResult === 0 && deleteResult === 0) {
        errorResponse(res, 404, "Review not found");
      }
       sucessResponse(res, reviewId, "Review deleted");
    } catch (error) {
      next(error);
    }
  }
);

router.get("/:resturantId/reviews",checkResturantExists,async(req:Request<Params>,res:Response,next)=>{
    const {resturantId} = req.params;
    const {page =1,limit =10}=req.query;

    const start = (Number(page)-1)*Number(limit)
    const end = start + Number(limit)-1

    try{

        const client = await intializeRedisClient();
        const reviewKey= reviewKeyById(resturantId);
        const reviewIds = await client.lRange(reviewKey,start,end)
        const reviews = await Promise.all(reviewIds.map(id=>client.hGetAll(reviewDetailsById(id))))
        sucessResponse(res,reviews)
    }catch(error){
        next(error)
    }

})

router.get("/:resturantId",checkResturantExists,async(req:Request<Params>,res:Response,next)=>{
        const {resturantId}=req.params;

        try{

            const client = await intializeRedisClient();
            const resturantKey = getRestaurantKey(resturantId);
            const [viewCount,resturant]=await Promise.all([client.hIncrBy(resturantKey,"viewCount",1),client.hGetAll(resturantKey)])
           
            sucessResponse(res,resturant);

        }catch(err){
            console.log(err)
            next(err)
        }
        
            
   
})


export default router;