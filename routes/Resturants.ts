import express from 'express';
import { validate } from '../middlewares/validate.js';
import { ResturantSchema ,type Resturant} from '../schemas/resturants.js';

const router = express.Router();

router.post("/",validate(ResturantSchema),async(req,res)=>{
    const data =req.body as Resturant;
    res.send("List of Restaurants");
})

export default router;