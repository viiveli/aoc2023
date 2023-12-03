import { readFileSync } from "fs";

let INPUT = readFileSync("./inputs/day01.in", "utf8");
let TEST = readFileSync("./inputs/day01.test2", "utf8");

const wordMap = [
  "zero",
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
];
const pattern = /(?=(\d|one|two|three|four|five|six|seven|eight|nine))/g;

const solver = (input: string) => {
  let sum = 0;

  for (const row of input.split("\n")) {
    let numerics: string = "";

    for (const match of row.matchAll(pattern)) {
      if (isNaN(Number(match[1]))) {
        numerics += Number(wordMap.indexOf(match[1]));
      } else {
        numerics += Number(match[1]);
      }
    }

    switch (numerics.length) {
      case 0:
        break;
      case 1:
        sum += Number(numerics[0] + numerics[0]);
        break;
      default:
        sum += Number(numerics[0] + numerics[numerics.length - 1]);
        break;
    }
  }

  return sum;
};

const solution = solver(INPUT);
console.log(solution);
