import { readFileSync } from "fs";

const INPUT = readFileSync("./inputs/day04.in", "utf8").trim();
const TEST = readFileSync("./inputs/day04.test", "utf8").trim();
const ROWS: string[] = [];

const parseCard = (input: string): [number[], number[]] => {
  const [_, winningNumerics, myNumerics] = input
    .split(/[:\|]/)
    .map((e) => e.trim());

  const winningNumbers = winningNumerics.split(/\s+/).map((e) => Number(e));
  const myNumbers = myNumerics.split(/\s+/).map((e) => Number(e));

  return [winningNumbers, myNumbers];
};

const checkCard = (winningNumbers: number[], myNumbers: number[]): number[] => {
  const filteredNumbers = winningNumbers.filter((n) => myNumbers.includes(n));

  let cardTotal = 0;
  if (filteredNumbers.length) {
    cardTotal = 1;
    for (let index = 1; index < filteredNumbers.length; index++) {
      cardTotal *= 2;
    }
  }

  return [cardTotal, filteredNumbers.length];
};

const solver = (input: string): { [key: string]: any } => {
  ROWS.push(...input.split("\n"));
  let result = 0;

  for (let index = 0; index < ROWS.length; index++) {
    const row = ROWS[index];

    const [winningNumbers, myNumbers] = parseCard(row);
    const [cardResult, copyCount] = checkCard(winningNumbers, myNumbers);

    result += cardResult;
  }

  return {
    part1: result,
    part2: 0,
  };
};

const solution = solver(INPUT);
console.log(solution);
