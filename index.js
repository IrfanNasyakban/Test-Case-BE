import express from "express";
import cors from "cors";
import KaryawanRoute from "./routes/KaryawanRoute.js";
import CutiRoute from "./routes/CutiRoute.js";

const app = express();
app.use(cors());
app.use(express.json()) ;

app.use(KaryawanRoute);
app.use(CutiRoute);

app.listen(5000, ()=> console.log("Server up and Running..."));