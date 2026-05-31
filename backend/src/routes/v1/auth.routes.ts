import express from "express";
import { z } from "zod";
import { validateRequest } from "zod-express-middleware";

const router = express.Router();

router.post("/register");
