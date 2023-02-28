import { config } from "https://deno.land/x/dotenv@v3.2.2/mod.ts";
import { Router } from "https://deno.land/x/oak@v11.1.0/mod.ts";
import { MongoClient } from "./MongoClient.ts";

const { COLLECTION } = config();
const router = new Router();

export const createMongoRouter = (client:MongoClient) => {
    const router = new Router();
    router.post("/new",async (ctx)=>{
        const {request,response} = ctx;
        const doc = await request.body().value;
        await client.insertOne({
            document:doc,collection:COLLECTION
        });
        response.status = 201
    })
    return router;
}

export default router;