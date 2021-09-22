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
    if (typeof a !== "number" || typeof b !== "number")
      return res.status(404).send("error en el tipo de dato");
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
        if (typeof x !== "number")
          return res.status(404).send("tipo de data no valido");
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

  public transformArray(req: Request, res: Response) {
    const { array, ordenament } = req.body;
    const result: number[] = [];
    const obj = Object.fromEntries(array);
    const sortable = [];
    for (let order in obj) {
      sortable.push([order, obj[order]]);
    }

    if (ordenament === "ASC") {
      sortable.sort(function (a, b) {
        return a[1] - b[1];
      });
    } else if (ordenament === "DESC") {
      sortable.sort(function (a, b) {
        return b[1] - a[1];
      });
    }

    sortable.forEach((x: string[]) => {
      if (typeof +x[0] === "number" && !Number.isNaN(+x[0])) result.push(+x[0]);
    });
    res.json(result);
  }

  public arrayScore(req: Request, res: Response) {
    const { array }: ArrayChallenge = req.body;
    let output = 0;
    array.forEach((x: number) => {
      if (typeof x !== "number")
        return res.status(404).send("tipo de dato no valido");
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
      if (!objGuia) return res.status(404).send("Guia no encontrada");
      const tickets = objGuia?.unidades.map((x: any) => x.etiqueta1d);
      let objRef = tickets.map((x: any) =>
        dataEtiquetas.filter((y: any) => y.etiqueta1d === x)
      );
      objRef = objRef.map((x: any) => {
        return {
          etiqueta1d: x[0].etiqueta1d,
          cantidad_checkpoints: x.length,
          tracking: x.map((y: any) => {
            return { checkpoint: y.checkpoint, tipo: y.tipo };
          }),
        };
      });

      const response = {
        isError: false,
        status: "success",
        data: {
          codigo_remision: reference,
          nombre_destinatario: objGuia.nombre_destinatario,
          dir_destinatario: objGuia.dir_destinatario,
          unidades: objRef,
        },
      };

      return res.json(response);
    } else if (reference.length === 15 && reference[0] === "7") {
      const objGuia = dataGuias.filter((x: any) =>
        x.unidades.includes(
          x.unidades.filter((y: any) => y.etiqueta1d === reference)[0]
        )
      )[0];

      let objReference = dataEtiquetas.filter(
        (x: any) => x.etiqueta1d === reference
      );
      objReference = objReference.map((x: any) => {
        return { ckeckpoint: x.checkpoint, tipo: x.tipo };
      });

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
  public myCows(req: Request, res: Response) {
    const { data } = req.body;
    const totalProduction: any = {};
    const mayoresProductores: any = {};
    const arrayTotal = [];
    const arrayTotalDays = [];
    let n = 0;

    data.forEach((x: any, i: any) => {
      let arrVaca = [];
      let arrLeche = [];
      let maxLeche = 0;
      let arrFilter = [];
      for (const property in x) {
        arrVaca.push([`Vaca ${property}`, x[property]]);
        arrLeche.push(x[property]);
        n += 1;
        totalProduction[`Dia ${i + 1}`]
          ? (totalProduction[`Dia ${i + 1}`] += x[property])
          : (totalProduction[`Dia ${i + 1}`] = x[property]);
        if (x[property] < 0 || x[property] > 11.9) {
          return res.send("ingrese dato valido");
        }
      }
      maxLeche = Math.max(...arrLeche);
      arrFilter = arrVaca.filter((x) => x[1] === maxLeche);
      arrFilter.forEach((x) => {
        if (mayoresProductores[`Dia ${i + 1}`]) {
          mayoresProductores[`Dia ${i + 1}`] =
            mayoresProductores[`Dia ${i + 1}`] + ` - ${x[0]}`;
        } else {
          mayoresProductores[`Dia ${i + 1}`] = x[0];
        }
      });
    });

    if (n / 7 < 3 || n / 7 > 50) return res.send("ingrese dato valido");

    for (const property in totalProduction) {
      arrayTotal.push(totalProduction[property]);
      arrayTotalDays.push([property, totalProduction[property]]);
    }

    let maxDay = Math.max(...arrayTotal);
    maxDay = arrayTotalDays.filter((x) => x[1] === maxDay)[0][0];
    let minDay = Math.min(...arrayTotal);
    minDay = arrayTotalDays.filter((x) => x[1] === minDay)[0][0];

    return res.json({
      "Producción total del hato en cada uno de los siete días":
        totalProduction,
      "Día de la semana con mayor y menor producción": {
        "Mayor producción": minDay,
        "Menor Producción": maxDay,
      },
      "El número de la vaca que dio más leche en cada día.": mayoresProductores,
    });
  }
}
