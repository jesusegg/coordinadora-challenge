import { Application, Request, Response } from "express";
import { Router } from "express";
import CoursesData from "../../data/courses.json";

const routes = Router();

export const loadApiEndpoints = (app: Application): void => {
  app.get("/api", (req: Request, res: Response) => {
    return res.status(200).send(CoursesData);
  });
};

export default routes;
