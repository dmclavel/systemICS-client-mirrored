// This is utility file for functions that is concerned with time

// Accepts two objects:
//      (time1: {day: 'val', time_start: 'val', time_end: 'val'}, time2: {day: 'val', time_start: 'val', time_end: 'val'})
//      time_start && time_end type is in military format HH:MM:ss
// return value : boolean value that returns true if it is conflict, and false otherwise
export const isScheduleConflict = (time1, time2) => {
  let days = new Array(5);
  let size = 5;
  // Initialized days array to 0 -> each index correspond to day
  while (size--) days[size] = false;

  const splittedDays1 = time1.day.split('-');
  const splittedDays2 = time2.day.split('-');

  splittedDays1.forEach(day => {
    // Set all days in time1
    switch (day) {
      case 'M':
        days[0] = true;
        break;
      case 'T':
        days[1] = true;
        break;
      case 'W':
        days[2] = true;
        break;
      case 'Th':
        days[3] = true;
        break;
      case 'F':
        days[4] = true;
        break;
      default:
        break;
    }
  });
  for (let i = 0; i < splittedDays2.length; i++) {
    switch (splittedDays2[0]) {
      case 'M':
        if (days[0]) {
          if (isTimeConflict(time1, time2)) return true;
        }
        break;
      case 'T':
        if (days[1]) {
          if (isTimeConflict(time1, time2)) return true;
        }
        break;
      case 'W':
        if (days[2]) {
          if (isTimeConflict(time1, time2)) return true;
        }
        break;
      case 'Th':
        if (days[3]) {
          if (isTimeConflict(time1, time2)) return true;
        }
        break;
      case 'F':
        if (days[4]) {
          if (isTimeConflict(time1, time2)) return true;
        }
        break;
      default:
        break;
    }
  }
  return false;
};

export const isTimeConflict = (time1, time2) => {
  const separator = ':';
  const splittedStringStart1 = time1.time_start.split(separator, 2);
  const splittedStringStart2 = time2.time_start.split(separator, 2);
  const splittedStringEnd1 = time1.time_end.split(separator, 2);
  const splittedStringEnd2 = time2.time_end.split(separator, 2);
  const totalMinsStart1 =
    splittedStringStart1[0] * 60 + Number(splittedStringStart1[1]);
  const totalMinsStart2 =
    splittedStringStart2[0] * 60 + Number(splittedStringStart2[1]);
  const totalMinsEnd1 =
    splittedStringEnd1[0] * 60 + Number(splittedStringEnd1[1]);
  const totalMinsEnd2 =
    splittedStringEnd2[0] * 60 + Number(splittedStringEnd2[1]);
  return !(
    totalMinsStart1 >= totalMinsEnd2 || totalMinsStart2 >= totalMinsEnd1
  );
};

// Given a time in military time, convert it to general time (with am/pm)
export const convertToGeneralTime = time => {
  const separator = ':';
  // Split only up to hours and minutes; ignore the seconds
  const splittedString = time.split(separator, 2);
  if (splittedString[0] < 12) {
    // if it has 0 at the beginning, trim the zero
    return `${splittedString[0].replace(/^0*/, '')}:${splittedString[1]}AM`;
  } else {
    if (splittedString[0] - 12 === 0) {
      return `12:${splittedString[1]}PM`;
    } else {
      return `${splittedString[0] - 12}:${splittedString[1]}PM`;
    }
  }
};
