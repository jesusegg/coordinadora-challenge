import { Challenge } from "../controllers/ChallengeClass";
import { Router } from "express";

const challenge = new Challenge();
const router = Router();

router.post("/myCows", challenge.myCows);

export default router;
