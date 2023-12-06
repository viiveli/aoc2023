import { readFileSync } from "fs";

const INPUT = readFileSync("./inputs/day06.in", "utf8").trim();
const TEST = readFileSync("./inputs/day06.test", "utf8").trim();
const a = 1;

const countWins = (race: { time: number; distance: number }): number => {
  let wins = 0;

  for (let t = 1; t < race.time; t++) {
    if (t * a * (race.time - t) > race.distance) wins++;
  }

  return wins;
};

const solver = (input: string): { [key: string]: any } => {
  const rows = input.split(/\n+/);
  const times = rows[0].split(/\s+/);
  const distances = rows[1].split(/\s+/);
  const races: { time: number; distance: number }[] = [];
  let part1 = 1;

  times.slice(1).map((v, i) => {
    races.push({
      time: Number(v),
      distance: Number(distances[i + 1]),
    });
  });

  for (const race of races) {
    part1 *= countWins(race);
  }

  const mightyRace = {
    time: Number(races.map((r) => r.time).join("")),
    distance: Number(races.map((r) => r.distance).join("")),
  };

  let part2 = countWins(mightyRace);

  return {
    part1: part1,
    part2: part2,
  };
};

const solution = solver(INPUT);
console.log(solution);
