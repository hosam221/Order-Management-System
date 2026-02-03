import type { Request, Response } from 'express';
import bodyParser from 'body-parser';
import user_routes from './handlers/users.js';
import express from 'express';
import type { Application } from 'express';

const app: Application = express();
const port:string = "0.0.0.0:3000";

app.use(bodyParser.json());

app.get('/',(req:Request,res:Response)=>{
    res.send("Helo World!");
});

// Initialize Routes
user_routes(app);


app.listen(3000, ()=> {
    console.log(`starting app on: ${port}`);
});

export default app;
