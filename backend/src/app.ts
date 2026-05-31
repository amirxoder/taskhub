import express, { Express, Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";
import { env } from "./config/env.js";

export const app: Express = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan(env.NODE_NEV === "production" ? "combined" : "dev"));

const corsOptions = {
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE"],
};
app.use(cors(corsOptions));

app.get("/health-check", async (req: Request, res: Response) => {
  res.status(200).json({
    message: "Everything is fine!",
  });
});
