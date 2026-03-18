import express from "express";
const router = express.Router();
import {login} from "../controllers/authControllers.js";

router.post("/api/auth/login",login);

export default router;