import { readFileSync } from "fs";

const INPUT = readFileSync("./inputs/day06.in", "utf8").trim();
const TEST = readFileSync("./inputs/day06.test", "utf8").trim();
const races: { time: number; distance: number }[] = [];

const solver = (input: string): { [key: string]: any } => {
  const rows = input.split(/\n+/);
  const times = rows[0].split(/\s+/);
  const distances = rows[1].split(/\s+/);
  const a = 1;
  let part1 = 1;

  times.slice(1).map((v, i) => {
    races.push({
      time: Number(v),
      distance: Number(distances[i + 1]),
    });
  });

  for (const race of races) {
    let wins = 0;

    for (let t = 1; t < race.time; t++) {
      if (t * a * (race.time - t) > race.distance) wins++;
    }

    part1 *= wins;
  }

  const totalTime = Number(races.map((r) => r.time).join(""));
  const totalDistance = Number(races.map((r) => r.distance).join(""));
  let part2 = 0;

  for (let t = 1; t < totalTime; t++) {
    if (t * a * (totalTime - t) > totalDistance) part2++;
  }

  return {
    part1: part1,
    part2: part2,
  };
};

const solution = solver(INPUT);
console.log(solution);
