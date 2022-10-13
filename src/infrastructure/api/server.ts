import { createApp } from "./express";
import dotenv from "dotenv";

dotenv.config()
const port = parseInt(process.env.PORT) || 3000;
const host: string = "0.0.0.0";

const app = createApp()

app.listen(port, host, () => {
    console.log(`Server is listening on port ${port}`);
})