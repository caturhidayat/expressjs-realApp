import express from "express";
const app = express();
import * as dotenv from "dotenv";
import cors from "cors";
dotenv.config();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

export { app };
