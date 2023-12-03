import { readFileSync } from "fs";

const INPUT = readFileSync("./inputs/day03.in", "utf8");
const TEST = readFileSync("./inputs/day03.test", "utf8");
const ROWS: string[] = [];

const isPartValid = (
  rowIndex: number,
  partMatch: RegExpMatchArray
): boolean => {
  const symbolPattern = /[^\w.]/g;
  const matches = [
    ...(ROWS[rowIndex - 1] || "").matchAll(symbolPattern),
    ...ROWS[rowIndex].matchAll(symbolPattern),
    ...(ROWS[rowIndex + 1] || "").matchAll(symbolPattern),
  ].filter((match) =>
    [
      Number(match.index) >= Number(partMatch.index) - 1,
      Number(match.index) <= Number(partMatch.index) + partMatch[0].length,
    ].every((i) => i === true)
  );

  if (matches.length) return true;

  return false;
};

const gearRatio = (rowIndex: number, gearIndex: number): number => {
  const partPattern = /\d+/g;
  const matches = [
    ...(ROWS[rowIndex - 1] || "").matchAll(partPattern),
    ...ROWS[rowIndex].matchAll(partPattern),
    ...(ROWS[rowIndex + 1] || "").matchAll(partPattern),
  ].filter((match) =>
    [
      [
        gearIndex < Number(match.index) + match[0].length,
        gearIndex > Number(match.index),
      ].every((i) => i === true),
      Math.abs(gearIndex - Number(match.index)) < 2,
      Math.abs(gearIndex - (Number(match.index) + match[0].length)) === 0,
    ].some((i) => i === true)
  );

  if (matches.length === 2) {
    return matches.map((i) => Number(i[0])).reduce((a, b) => a * b, 1);
  }

  return 0;
};

const solver = (input: string): { [key: string]: any } => {
  ROWS.push(...input.split("\n"));
  let sum = 0;
  let gr = 0;

  for (const [rowIndex, row] of ROWS.entries()) {
    for (const partMatch of row.matchAll(/\d+/g)) {
      if (isPartValid(rowIndex, partMatch)) {
        sum += Number(partMatch[0]);
      }
    }

    for (const gearMatch of row.matchAll(/\*/g)) {
      gr += gearRatio(rowIndex, Number(gearMatch.index));
    }
  }

  return {
    part1: sum,
    part2: gr,
  };
};

const solution = solver(INPUT);
console.log(solution);
