import { Challenge } from "../controllers/ChallengeClass";
import { Router } from "express";

const challenge = new Challenge();
const router = Router();

router.get("/tracking/:code", challenge.Tracking);

export default router;
