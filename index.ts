import express from 'express';
import restruatsRouter from './routes/Resturants.js';
import cuisinesRouter from './routes/Cuisines.js';
import { errorHandler } from './middlewares/errorHandler.js';

//definig the port 
const PORT = process.env.PORT || 3000;

const app =express();

app.use(express.json());

//using the routers
app.use('/restaurants', restruatsRouter);



//using middlewares
app.use(errorHandler)


//listening to the port
app.listen(PORT,()=>{
    console.log(`Application is running on port ${PORT}`);
}).on('error', (err) => {
    console.error(`Error occurred while starting the server: ${err.message}`);
}
);