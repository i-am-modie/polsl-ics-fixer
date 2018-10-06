const moment = require('moment');
const fs = require('fs');

const lineReader = require('readline').createInterface({
    input: fs.createReadStream(process.argv[2]),
});

const header = [];
const dates = [];

let actualObject = {};
let candidate = {};

let headerDone = false;
lineReader.on('line', (lineString) => {
    const line = lineString.split(':');
    if (!headerDone) {
        if (line[0] === 'BEGIN' && line[1] === 'VEVENT') {
            headerDone = true
        }
        else {
            console.log('line of header:', lineString);
            header.push(lineString)
        }
    }
    else {
        switch (line[0]) {
            case 'BEGIN':
                break;
            case 'DTSTART':
                candidate.DTSTART = moment(line[1], moment.ISO_8601);
                break;
            case 'DTEND':
                candidate.DTEND = moment(line[1], moment.ISO_8601);
                break;
            case 'SUMMARY':
                candidate.SUMMARY = line[1];
                break;
            case 'END':
                if (candidate.SUMMARY === actualObject.SUMMARY && candidate.DTSTART.hour() === actualObject.DTSTART.hour()) {
                    if (!actualObject.FREQUENCY) {
                        actualObject.FREQUENCY= candidate.DTSTART.diff(actualObject.DTSTART, 'weeks');
                    }
                    actualObject.UNTIL = candidate.DTEND.add(1, 'day');
                }
                else {
                    if (Object.keys(actualObject).length) {
                        console.log(actualObject);
                        dates.push(actualObject);
                    }
                    actualObject = candidate;
                }
                candidate = {};
                break;
            default:
                break;
        }
    }
});
