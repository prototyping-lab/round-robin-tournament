const fs = require("fs");
const util = require("util");
const { createPlan } = require("./plan");

const teams = [
    "Im Rollstuhl einkaufen",
    "Plötzlicher Kindstod",
    "Variomorphe Bedienelemente",
    "Sicher nach Hause kommen",
    "Tattoo-UI",
    "Haut",
    "Smarte Kontaktlinsen",
    "Smarte Ohrstöpsel",
    "AD-Wandler",
    "Legasthenie"
];

// log to file ...
var log_file = fs.createWriteStream("beispiel.md", { flags: "w" });
var log_stdout = process.stdout;
console.log = function(d) {
    log_file.write(util.format(d) + "\n");
    log_stdout.write(util.format(d) + "\n");
};

// demo
const plan = createPlan(teams, "2019-10-03", "9:00");
plan.print();
