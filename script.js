const mahiSecond = 0.432;
const mahiMinute = 100 * mahiSecond;
const mahiHour = 100 * mahiMinute;
const mahiDay = 20.0381628 * mahiHour;
const Day = 20 * mahiHour;
// const mahiYear = 366 * mahiDay;
// const Year = 365.2422 * Day

const seasons = ["Spring", "Summer", "Autumn", "Winter"];
const months = [
    { name: "Spring 1st", latin_name: "January", persian_name: "Farvardīn (Guardian spirits)", days: 31 },
    { name: "Spring 2nd", latin_name: "February", persian_name: "Ordībehešt (Best Righteousness)", days: 31 },
    { name: "Spring 3rd", latin_name: "March", persian_name: "Khordād (Perfection)", days: 31 },
    { name: "Summer 1st", latin_name: "April", persian_name: "Tīr (Sirius)", days: 31 },
    { name: "Summer 2nd", latin_name: "May", persian_name: "Amordād (Immortality)", days: 31 },
    { name: "Summer 3rd", latin_name: "June", persian_name: "Shahrīvar (Desirable Dominion)", days: 31 },
    { name: "Autumn 1st", latin_name: "July", persian_name: "Mehr (Covenant)", days: 30 },
    { name: "Autumn 2nd", latin_name: "August", persian_name: "Ābān (Waters)", days: 30 },
    { name: "Autumn 3rd", latin_name: "September", persian_name: "Āzar (Fire)", days: 30 },
    { name: "Winter 1st", latin_name: "October", persian_name: "Dey (The Creator)", days: 30 },
    { name: "Winter 2nd", latin_name: "November", persian_name: "Bahman (Good Spirit)", days: 30 },
    { name: "Winter 3rd", latin_name: "December", persian_name: "Esfand (Holy Devotion)", days: 30 },
];

const day_of_week = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

let isAMPM = false;
let calendarDisplay = "persian";

function padZero(value) {
    return value < 10 ? `0${value}` : value;
}

function getDetail(start, now, offset) {
    const elapsedMilliseconds = now - start;
    const elapsedMahiDays = elapsedMilliseconds / (Day * 1000);
    const currentMahiDayOfYear = Math.floor(elapsedMahiDays);
    const remainingDayFraction = elapsedMahiDays - currentMahiDayOfYear;

    let currentMahiHour = Math.floor(remainingDayFraction * 20);
    const remainingHourFraction = (remainingDayFraction * 20) - currentMahiHour;

    const currentMahiMinute = Math.floor(remainingHourFraction * 100);
    const remainingMinuteFraction = (remainingHourFraction * 100) - currentMahiMinute;

    const currentMahiSecond = Math.floor(remainingMinuteFraction * 100);

    let period = '';
    if (isAMPM) {
        period = currentMahiHour < 10 ? 'AM' : 'PM';
        currentMahiHour = currentMahiHour % 10;
    }

    let dayOfYear = currentMahiDayOfYear + 1;
    let month = "";
    let persianMonth = "";
    let latinMonth = "";
    let dayOfMonth = 0;
    let dayOfWeek = now.getDay();
    for (let i = 0; i < months.length; i++) {
        if (dayOfYear > months[i].days) {
            dayOfYear -= months[i].days;
        } else {
            month = i+1;
            persianMonth = months[i].persian_name;
            latinMonth = months[now.getMonth()].latin_name;
            dayOfMonth = dayOfYear;
            break;
        }
    }
    dayOfWeek = day_of_week[dayOfWeek];
    return { year: now.getFullYear()+10000, month, dayOfMonth, hour: currentMahiHour, min: currentMahiMinute, sec: currentMahiSecond, weekday: dayOfWeek, period, persianMonth, latinMonth };
}

function updateMahiTime() {
    let now = new Date();
    const mahiYearStart = new Date(2024, 2, 20, 0, 0, 0, 0);
    const yearStart = new Date(2024, 0, 0, 0, 0, 0, 0);
    const mahiDetail = getDetail(mahiYearStart, now, 3);
    const gregorianDetail = getDetail(yearStart, now, 0);

    const currentTimeString = `Time: ${padZero(mahiDetail.hour)}:${padZero(mahiDetail.min)}:${padZero(mahiDetail.sec)} -or- ${padZero(mahiDetail.hour)}.${padZero(mahiDetail.min)}${padZero(mahiDetail.sec)} ${mahiDetail.period}`;
    document.getElementById('mahi-current-time').textContent = currentTimeString;

    const currentDateString = `${mahiDetail.year}, ${mahiDetail.month}, ${mahiDetail.dayOfMonth}, ${mahiDetail.weekday}`;
    document.getElementById('mahi-current-date').textContent = currentDateString;

    document.getElementById('mahi-persian-month').textContent = `${mahiDetail.year}, ${mahiDetail.persianMonth}, ${mahiDetail.dayOfMonth}, ${mahiDetail.weekday}`;    
    document.getElementById('mahi-latin-month').textContent = `${gregorianDetail.year}, ${gregorianDetail.latinMonth}, ${now.getDate()}, ${gregorianDetail.weekday}`;
    
}

function setClockFormat(format) {
    isAMPM = (format === 'ampm');
}

function setCalendarDisplay(display) {
    calendarDisplay = display;
}

setInterval(updateMahiTime, 1);
updateMahiTime();
