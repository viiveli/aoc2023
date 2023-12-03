import { readFileSync } from "fs";

const INPUT = readFileSync("./inputs/day02.in", "utf8");
const TEST = readFileSync("./inputs/day02.test", "utf8");

const REDLIMIT = 12;
const GREENLIMIT = 13;
const BLUELIMIT = 14;

const validRound = (red: number, green: number, blue: number): boolean => {
  if (
    [
      red === 0 || red <= REDLIMIT,
      green === 0 || green <= GREENLIMIT,
      blue === 0 || blue <= BLUELIMIT,
    ].every((i) => i === true)
  ) {
    return true;
  }

  return false;
};

const solver = (input: string): { [key: string]: any } => {
  let power: number = 0;
  let validGames: Set<number> = new Set();
  let rounds: {
    game: number;
    round: number;
    red: number;
    green: number;
    blue: number;
  }[] = [];

  for (const row of input.split("\n")) {
    const [id, game] = row.split(": ");
    const gameId = Number(id.split(" ")[1]);

    game.split("; ").map((round, i) =>
      round.split(", ").map((j) => {
        let colors: { [key: string]: number } = {
          red: 0,
          green: 0,
          blue: 0,
        };

        colors[String(j.split(" ")[1])] = Number(j.split(" ")[0]);

        rounds.push({
          game: gameId,
          round: i,
          red: colors.red,
          green: colors.green,
          blue: colors.blue,
        });
      })
    );
  }

  for (let uniqueGame of new Set(rounds.map((i) => i.game))) {
    const uniqueGames = rounds.filter((i) => i.game === uniqueGame);

    if (
      uniqueGames
        .map((i) => validRound(i.red, i.green, i.blue))
        .every((i) => i === true)
    ) {
      validGames.add(uniqueGame);
    }

    power += [
      Math.max(...uniqueGames.map((i) => i.red)),
      Math.max(...uniqueGames.map((i) => i.green)),
      Math.max(...uniqueGames.map((i) => i.blue)),
    ].reduce((a, b) => a * b, 1);
  }

  return {
    part1: Array.from(validGames).reduce((a, b) => a + b, 0),
    part2: power,
  };
};

const solution = solver(INPUT);
console.log(solution);
