import express from "express";
import userRoutes from "./routes/userRoute.js";
import cors from "cors";

const app = express();

//Middleware
app.use(express.json());

const corsOptions = {
  origin: "*",
};

app.use(cors(corsOptions));

app.use(userRoutes);

export default app;
