
const { createDates, createSlots } = require("./createTimes");

function createPlan(teams, startDate, startTime) {

    // dummy team, to make sure we have an even amount of teams
    if (teams.length % 2) {
        teams.push(undefined);
    }
    const n = teams.length;
    const dates = createDates(startDate, n - 1);
    const slots = createSlots(startTime, n / 2);

    const plan = new Plan(dates, slots);
    plan.schedule(teams);

    return plan;
}

class Plan {

	constructor(termine, slots) {
        this.termine = termine;
        this.slots = slots;
        this.init();
    }

    init() {
        // create empty plan
        const { rows, cols } = this;
        this.plan = new Array(cols);
        for (var i = 0; i < cols; i++) {
            this.plan[i] = new Array(rows).fill('n/a');
        }
    }

    // round robin
    schedule(teams) {
        let cycle = teams.slice();
        const { rows, cols } = this;
        for (var j = 0; j < cols; j++) {
            for (var i = 0; i < rows; i++) {
                const team1 = cycle[i];
                const team2 = cycle[cols - i];
                // single teams
                if (team1 === undefined || team2 === undefined) {
                    this.plan[j][i] = team1 || team2;
                }
                // pairs of teams
                else {
                    this.plan[j][i] = `${team1} ⟺   ${team2}`;
                }
            }
       
            // rotate all elemets except the first one
            cycle.splice(1, 0, cycle.pop());
        }
    }
    
	get rows() { return this.slots.length; }
    get cols() { return this.termine.length; }

    print() {
        const { termine, slots, plan, cols, rows } = this;
        for (let j = 0; j < cols; j++) {
            console.log(`### ${termine[j]} \n`);
            for (let i = 0; i < rows; i++) {
                console.log(`${slots[i]} : ${plan[j][i]}  `);
            };
            console.log('\n');
        };
    }

}

module.exports = {
    Plan,
    createPlan
}


