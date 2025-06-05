import { createClient,type RedisClientType } from "redis";

let client : RedisClientType|null=null;

export async function intializeRedisClient(){
    if(!client){
      client =  createClient();

        //on error , following code will be executed
        client.on("error",(err)=>{
            console.error("Redis Client Error", err);
        })

        //on connect, following code will be executed
        client.on("connect",()=>{
            console.log("Redis Client Connected");
        });

        await client.connect();
        
    }
    return client;
}