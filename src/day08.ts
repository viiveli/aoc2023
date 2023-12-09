import { match } from "assert";
import { readFileSync } from "fs";

const INPUT = readFileSync("./inputs/day08.in", "utf8").trim();
const TEST = readFileSync("./inputs/day08.test", "utf8").trim();

class Node {
  name: string;
  L: string;
  R: string;

  constructor(name: string, L: string, R: string) {
    this.name = name;
    this.L = L;
    this.R = R;
  }
}

const solver = (input: string): { [key: string]: any } => {
  let instructions = input.split("\n\n")[0].split("");
  let nodes: { [key: string]: Node } = {};

  input
    .split("\n\n")[1]
    .split("\n")
    .map((row) => {
      const name = row.split(" = ")[0];
      const [L, R] = row
        .split(" = ")[1]
        .split(", ")
        .map((e) => e.replace(/[^\w\s]/, ""));
      nodes[name] = new Node(name, L, R);
    });

  let node = nodes["AAA"];
  let hops = 0;

  while (true) {
    let instruction = instructions.shift();
    if (!instruction) break;
    instructions.push(instruction);

    switch (instruction) {
      case "L":
        node = nodes[node.L];
        break;

      case "R":
        node = nodes[node.R];
        break;

      default:
        break;
    }

    hops++;

    if (node.name === "ZZZ") {
      break;
    }
  }

  return {
    part1: hops,
    part2: 0,
  };
};

const solution = solver(INPUT);
console.log(solution);
