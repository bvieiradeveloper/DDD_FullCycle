import express, { Express } from "express";
import { customerRoute } from "./routes/customer.route";

export function createApp(){
    const app: Express = express();
    app.use(express.json());
    app.use(customerRoute);
    return app
}