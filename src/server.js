// src/server.js
import express from "express";
import userRouter from "./routes/user.route.js";
import schoolRouter from "./routes/school.route.js";
import dotenv from "dotenv";
import { env } from "prisma/config";
import { swaggerDocs } from './swagger.js';

dotenv.config();

const app = express();
swaggerDocs(app);
const PORT = process.env.PORT;

// Middleware
app.use(express.json());

// Routes
app.use("/api/users", userRouter);
app.use("/api/school", schoolRouter);

// Khởi động Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});