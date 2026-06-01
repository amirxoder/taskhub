import express from "express";

import { validateRequest } from "zod-express-middleware";
import { registerSchema } from "../../utils/validate-schema.js";
import { register } from "../../controllers/v1/auth.controller.js";

const router = express.Router();

router.post("/register", validateRequest({ body: registerSchema }), register);

export default router;
