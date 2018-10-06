const moment = require('moment');
const fs = require('fs');

if (!process.argv[2]) {
    throw new Error('Podaj plik ics');
}

const input = fs.createReadStream(process.argv[2]);
input.on('error', function () {
    throw new Error("Brak pliku");
});

const lineReader = require('readline').createInterface({
    input
});

const output = fs.createWriteStream('result.ics');

const ISOWITHOUTSPECIALSIGNSFORMAT = 'YYYYMMDDTHHMM00[Z]';

const objectToIcsEvent = (obj) => {
    const icsArr = [];
    const now = moment();
    icsArr.push('BEGIN:VEVENT');
    icsArr.push(`DTSTART:${obj.DTSTART.format(ISOWITHOUTSPECIALSIGNSFORMAT)}`);
    icsArr.push(`DTEND:${obj.DTEND.format(ISOWITHOUTSPECIALSIGNSFORMAT)}`);
    icsArr.push(`DTSTAMP:${now.format(ISOWITHOUTSPECIALSIGNSFORMAT)}`);
    icsArr.push(`UID:${obj.DTSTART.format('YYYYMMDD0HHMM0')}`);
    icsArr.push('CLASS:PUBLIC');
    icsArr.push('SEQUENCE:0');
    icsArr.push('STATUS:CONFIRMED');
    icsArr.push(`SUMMARY:${obj.SUMMARY}`);
    icsArr.push(`RRULE:FREQ=WEEKLY;INTERVAL=${obj.FREQUENCY};UNTIL=${obj.UNTIL.format(ISOWITHOUTSPECIALSIGNSFORMAT)}`);
    icsArr.push('TRANSP:OPAQUE');
    icsArr.push('END:VEVENT');
    return icsArr.join('\n') + '\n';
};
const header = [];

let actualObject = {};
let candidate = {};

let headerDone = false;

lineReader.on('line', (lineString) => {
    const line = lineString.split(':');
    if (!headerDone) {
        if (line[0] === 'BEGIN' && line[1] === 'VEVENT') {
            headerDone = true;
            output.write(header.join('\n') + '\n');
        }
        else {
            header.push(lineString)
        }
    }
    else {
        switch (line[0]) {
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
                if (candidate.SUMMARY === actualObject.SUMMARY && candidate.DTSTART.utc().hour() === actualObject.DTSTART.utc().hour()) {
                    if (!actualObject.FREQUENCY) {
                        actualObject.FREQUENCY = candidate.DTSTART.diff(actualObject.DTSTART, 'weeks');
                    }
                    actualObject.UNTIL = candidate.DTEND.add(1, 'day');
                }
                else {
                    if (Object.keys(actualObject).length) {
                        output.write(objectToIcsEvent(actualObject));
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

lineReader.on('close', () => {
    output.write('END:VCALENDAR');
    output.close()
});