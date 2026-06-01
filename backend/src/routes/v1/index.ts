import { Router } from "express";

import authRouters from "./auth.routes.js";

const router = Router();

router.use("/auth", authRouters);

export default router;
