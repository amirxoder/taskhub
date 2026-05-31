import express, { Express, Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";
import { env } from "./config/env.js";

import routes from "./routes/index.js";

export const app: Express = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan(env.NODE_NEV === "production" ? "combined" : "dev"));

const corsOptions = {
  origin: env.FRONTEND_URL,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions));

routes.use("/api", routes);

app.get("/health-check", async (req: Request, res: Response) => {
  res.status(200).json({
    message: "Everything is fine!",
  });
});
