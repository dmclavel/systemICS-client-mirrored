// This is utility file for functions that is concerned with time

// Accepts two objects:
//      (time1: {day: 'val', time_start: 'val', time_end: 'val'}, time2: {day: 'val', time_start: 'val', time_end: 'val'})
//      time_start && time_end type is in military format HH:MM:ss
// return value : boolean value that returns true if it is conflict, and false otherwise 
export const isConflicting = (time1, time2) => {
    const separator = ":";
    const splittedStringStart1 = time1.time_start.split(separator, 2);
    const splittedStringStart2 = time2.time_start.split(separator, 2);
    const splittedStringEnd1 = time1.time_end.split(separator, 2);
    const splittedStringEnd2 = time2.time_end.split(separator, 2);
    const totalMinsStart1 = splittedStringStart1[0] * 60 + Number(splittedStringStart1[1]);
    const totalMinsStart2 = splittedStringStart2[0] * 60 + Number(splittedStringStart2[1]);
    const totalMinsEnd1 = splittedStringEnd1[0] * 60 + Number(splittedStringEnd1[1]);
    const totalMinsEnd2 = splittedStringEnd2[0] * 60 + Number(splittedStringEnd2[1]);
    return !(totalMinsStart1 >= totalMinsEnd2 || totalMinsStart2 >= totalMinsEnd1);
}

// Given a time in military time, convert it to general time (with am/pm)
export const convertToGeneralTime = (time) => {
    const separator = ":";
    // Split only up to hours and minutes; ignore the seconds
    const splittedString = time.split(separator, 2);
    let result = "";
    if (splittedString[0] < 12) {
        // if it has 0 at the beginning, trim the zero
        return `${splittedString[0].replace(/^0*/, "")}:${splittedString[1]}am`;
    } else {
        return `${splittedString[0] - 12}:${splittedString[1]}pm`;
    }
}