import { Router } from "express";
import challenge from "./challenge";
import average from "./average";
import stringManipulation from "./stringManipulation";
import sumArray from "./sumArray";
import transformArray from "./transformArray";
import arrayScore from "./arrayScore";
import tracking from "./trackingCoordinadora";
import myCows from "./myCows";

const routes = Router();

routes.use("/challenge", challenge);
routes.use("/challenge", average);
routes.use("/challenge", stringManipulation);
routes.use("/challenge", sumArray);
routes.use("/challenge", arrayScore);
routes.use("/challenge", transformArray);
routes.use("/challenge", tracking);
routes.use("/challenge", myCows);

export default routes;
