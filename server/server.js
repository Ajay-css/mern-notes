import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import router from "./routes/noteRoute.js";
import connectDB from "./config/db.js";

dotenv.config();

const app = express();

// middlewares

app.use(express.json());
app.use(cors());
app.use('/api/notes', router)

// connecting Mongodb

await connectDB();

app.get("/", (_, res) => {
    res.send("<h1>Express Server is Working Fine!</h1>");
});

app.listen(process.env.PORT, () => {
    console.log(`Server is running on : http://localhost:${process.env.PORT}`);
});