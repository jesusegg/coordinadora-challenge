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
    array.forEach((x: number) => {
      if (x % 2 === 0) output += 1;
      if (x % 2 !== 0 && x !== 5) output += 3;
      if (x === 5) output += 5;
    });
    return res.send(`${output}`);
  }

  public async Tracking(req: Request, res: Response) {
    const reference = req.params.code;

    const dataEtiquetas = await dataTalentosCheckpoint;
    const dataGuias = await dataTalentos;

    if (reference.length === 11) {
      const objGuia = dataGuias.filter(
        (x: any) => x.codigo_remision === reference
      )[0];
      const tickets = objGuia.unidades.map((x: any) => x.etiqueta1d);
      const objRef = tickets.map((x: any) =>
        dataEtiquetas.filter((y: any) => y.etiqueta1d === x)
      );

      const response = {
        isError: false,
        status: "success",
        data: {
          codigo_remision: reference,
          nombre_destinatario: objGuia.nombre_destinatario,
          dir_destinatario: objGuia.dir_destinatario,
          unidades: [
            {
              etiqueta1d: "734380016861001",
              cantidad_checkpoints: 5,
              tracking: [
                {
                  checkpoint: "Asignacion Para Distribucion",
                  tipo: "Virtual",
                },
                {
                  checkpoint: "Descargue Ruta Nacional",
                  tipo: "Fisica",
                },
                {
                  checkpoint: "Despacho",
                  tipo: "Fisica",
                },
                {
                  checkpoint: "Descargue Recogida",
                  tipo: "Fisica",
                },
                {
                  checkpoint: "Recogida",
                  tipo: "Fisica",
                },
              ],
            },
            {
              etiqueta1d: "734380016861002",
              cantidad_checkpoints: 3,
              tracking: [
                {
                  checkpoint: "Asignacion Para Distribucion",
                  tipo: "Fisica",
                },
                {
                  checkpoint: "Descargue Ruta Nacional",
                  tipo: "Fisica",
                },
                {
                  checkpoint: "Despacho",
                  tipo: "Fisica",
                },
              ],
            },
          ],
        },
      };
      console.log(objRef);
      return res.json(dataGuias[0]);
    } else if (reference.length === 15 && reference[0] === "7") {
      const objGuia = dataGuias.filter((x: any) =>
        x.unidades.includes(
          x.unidades.filter((y: any) => y.etiqueta1d === reference)[0]
        )
      )[0];

      const objReference = dataEtiquetas.filter(
        (x: any) => x.etiqueta1d === reference
      );

      if (!objGuia) return res.send("referencia no encontrada");

      const response = {
        isError: false,
        status: "success",
        data: {
          etiqueta: reference,
          informacion_guia: {
            codigo_remision: objGuia.codigo_remision,
            nombre_destinatario: objGuia.nombre_destinatario,
            dir_destinatario: objGuia.dir_destinatario,
          },
          cantidad_checkpoints: objReference.length,
          tracking: objReference,
        },
      };
      return res.json(response);
    }

    return res.status(404).send("codigo guia o de etiqueta incorrecto");
  }
}
