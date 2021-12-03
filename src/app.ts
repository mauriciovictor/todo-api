require("dotenv").config();
import express from "express";
import { routes } from "./routes/public.routes";
import "./database/config";

const app = express();

app.use([express.json(), routes]).listen(8000);
