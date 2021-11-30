import express from "express";

import "./database/config";
import { routes } from "./routes/public.routes";

const app = express();

app.use([express.json(), routes]).listen(8000);
