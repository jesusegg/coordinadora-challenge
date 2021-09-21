function string(str) {
  const lastLetter = str.slice(-1);
  if (lastLetter === "!") {
    str = str.slice(0, str.length - 1);
    return str;
  }
  return str;
}
string("hola66!!!");

function sumArray(arr) {
  let sumAll = 0;
  let sumPositive = 0;
  let sumPair = 0;
  let sumOdd = 0;
  arr.forEach((x) => {
    sumAll += x;
    if (x > 0) sumPositive += x;
    if (x % 2 === 0) sumPair += x;
    if (x % 2 !== 0) sumOdd += x;
  });
  return { sumAll, sumPositive, sumPair, sumOdd };
}
sumArray([-2, 5, 4, 2, -5, 7]);

async function average(a, b) {
  try {
    const response = (await a) + b / 2;
    return response;
  } catch (e) {
    throw new TypeError("Ha ocurrido un error con este reto");
  }
}
