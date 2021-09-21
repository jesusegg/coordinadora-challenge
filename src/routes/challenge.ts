import { Application, Request, Response } from "express";
import { Challenge } from "../controllers/ChallengeClass";
import { Router } from "express";

const challenge = new Challenge();
const router = Router();

const sample = (req: Request, res: Response) => {
  res.send("funciona");
};
router.post("/", challenge.average);

export default router;
