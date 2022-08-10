import "dotenv/config";
import express from "express";
import userRoutes from "./routes/userRoutes.js";
import clotheRoutes from "./routes/clotheRoutes.js";
import detailRoutes from "./routes/detailRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";

import cors from "cors";

const app = express();

//Middleware
app.use(express.json());

const corsOptions = {
  origin: "*",
};

app.use(cors(corsOptions));

app.use(userRoutes);
app.use(clotheRoutes);
app.use(detailRoutes);
app.use(notificationRoutes);

export default app;
