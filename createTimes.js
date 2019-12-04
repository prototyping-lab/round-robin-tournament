const moment = require("moment");

// weekly meetings, begining at startDate
function createDates(startDate, n) {
  const dates = [];
  const m = moment(startDate);
  for (var i = 0; i < n; i++) {
    m.add(7, "days");
    dates.push(m.format("DD.MM.YYYY"));
  }
  return dates;
}

// meeting slots, with an added buffer and lunch break
function createSlots(
  startSlot,
  n,
  opts = { duration: 60, buffer: 20, lunch: 30 }
) {
  const { duration, buffer, lunch } = opts;
  const slots = [];
  let end = moment(startSlot, "HH:mm");
  for (var i = 0; i < n; i++) {
    let start = moment(end);
    end.add(duration, "m");
    // print slot duration
    slots.push(`${start.format("HH:mm")} – ${end.format("HH:mm")}`);
    end.add(buffer, "m");
    // add lunch break
    if (start.hour() < 12 && end.hour() > 12) {
      end.add(lunch, "m");
    }
  }
  return slots;
}

module.exports = {
  createDates,
  createSlots
};
