import { Router } from "express";
import challenge from "./challenge";
import average from "./average";
import stringManipulation from "./stringManipulation";
import sumArray from "./sumArray";
import arrayScore from "./arrayScore";
import tracking from "./trackingCoordinadora";

const routes = Router();

routes.use("/challenge", challenge);
routes.use("/challenge", average);
routes.use("/challenge", stringManipulation);
routes.use("/challenge", sumArray);
routes.use("/challenge", arrayScore);
routes.use("/challenge", tracking);

export default routes;
