import express from "express";
import dotenv from "dotenv";
import path from "path";
import mongoose from "mongoose";
import cors from "cors";
import routerAPI from "./routers/index.js";


dotenv.config();

const port = process.env.PORT || 3000;
const DB_URL = process.env.DB_URL;

//Conenect to MongoDB

mongoose.connect(DB_URL)
    .then(() => console.log("MongoDB connected successfully!"))
    .catch((err) => console.error("MongoDB connection error:", err));

const db = mongoose.connection;

db.on("error", (error) => console.log("MongoDB connection error", error));
db.once("open", () => {
    console.log("MongoDB connection opened successfully!");
});

const app = express();

//Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

app.use((request, response, next ) => {       
    console.log(`${request.method} ${request.url}`);
    next();
});

routerAPI(app);

app.listen(port, () =>{
    console.info("Server is running on port: ", port);
})

app.get("/", (request, response) => {
    response.send("Hello World")
});