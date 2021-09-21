import { Request, Response } from "express";
import { dataTalentos, dataTalentosCheckpoint } from "../controllers/axios";

interface ArrayChallenge {
  array: number[];
}
interface average {
  a: number;
  b: number;
}

export class Challenge {
  public average(req: Request, res: Response) {
    const { a, b }: average = req.body;

    try {
      const response = (a + b) / 2;
      return res.send(`${response}`);
    } catch (e) {
      throw new TypeError("Ha ocurrido un error con este reto");
    }
  }

  public stringManipulation(req: Request, res: Response) {
    let { str } = req.body;
    const lastLetter: string = str.slice(-1);
    if (lastLetter === "!") {
      str = str.slice(0, str.length - 1);
      return res.send(str);
    }
    return res.send(str);
  }

  public sumArray(req: Request, res: Response) {
    const { array }: ArrayChallenge = req.body;
    let sumAll = 0;
    let sumPositive = 0;
    let sumPair = 0;
    let sumOdd = 0;
    if (array?.length === 0) return res.send("0");
    if (!array || !Array.isArray(array)) {
      return res
        .status(404)
        .send("error al introducir los parametros para sumArray");
    }
    try {
      array.forEach((x: number) => {
        sumAll += x;
        if (x > 0) sumPositive += x;
        if (x % 2 === 0) sumPair += x;
        if (x % 2 !== 0) sumOdd += x;
      });
      return res.json({ sumAll, sumPositive, sumPair, sumOdd });
    } catch {
      throw new TypeError(
        "Ha ocurrido un error al ejecutar la funcion sumArray"
      );
    }
  }

  public arrayScore(req: Request, res: Response) {
    const { array }: ArrayChallenge = req.body;
    let output = 0;
    console.log(dataTalentos, dataTalentosCheckpoint);
    array.forEach((x: number) => {
      if (x % 2 === 0) output += 1;
      if (x % 2 !== 0 && x !== 5) output += 3;
      if (x === 5) output += 5;
    });
    return res.send(`${output}`);
  }
}
