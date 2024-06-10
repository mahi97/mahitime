const mahiSecond = 0.431105536;
const mahiMinute = 100 * mahiSecond;
const mahiHour = 100 * mahiMinute;
const mahiDay = 20 * mahiHour;
const mahiYear = 366 * mahiDay;

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


function padZero(value) {
    return value < 10 ? `0${value}` : value;
}

function get_detail(start, now) {
    const elapsedMilliseconds = now - start;
    const elapsedMahiDays = elapsedMilliseconds / (mahiDay * 1000);
    const currentMahiDayOfYear = Math.floor(elapsedMahiDays);
    const remainingDayFraction = elapsedMahiDays - currentMahiDayOfYear;

    let currentMahiHour = Math.floor(remainingDayFraction * 20);
    const remainingHourFraction = (remainingDayFraction * 20) - currentMahiHour;

    const currentMahiMinute = Math.floor(remainingHourFraction * 100);
    const remainingMinuteFraction = (remainingHourFraction * 100) - currentMahiMinute;

    const currentMahiSecond = Math.floor(remainingMinuteFraction * 100);

    const period = currentMahiHour < 10 ? 'AM' : 'PM';
    currentMahiHour = currentMahiHour % 10;
    let dayOfYear = currentMahiDayOfYear + 1;
    let month = "";
    let persianMonth = "";
    let latinMonth = "";
    let dayOfMonth = 0;
    let dayOfWeek = (dayOfYear - 1 + 3) % 7;
    let month_num = 0;
    for (let i = 0; i < months.length; i++) {
        if (dayOfYear > months[i].days) {
            dayOfYear -= months[i].days;
        } else {
            month = months[i].name;
            persianMonth = months[i].persian_name;
            latinMonth = months[i].latin_name;
            dayOfMonth = dayOfYear;
            month_num = i+1;
            break;
        }
    }

    dayOfWeek = day_of_week[dayOfWeek];
    return year, month, day, hour, min, sec, weekday, period
}

function updateMahiTime() {
    const now = new Date();
    const mahiYearStart = new Date('2024-03-20T03:07:00');
    const yearStart = new Date('2024-01-01T00:00:00');
    mYear, mMonth, mDay, mHour, mMin, mSec, mWeekday, mPeriod = get_detail(mahiYearStart, now);
    gYear, gMonth, gDay, gHour, gMin, gSec, gWeekday, gPeriod = get_detail(yearStart, now);

    const currentTimeString = `Time: ${padZero(mHour)}:${padZero(mMin)}:${padZero(mSec)} ${mPeriod}`;
    document.getElementById('mahi-current-time').textContent = currentTimeString;

    const currentDateString = `${now.getFullYear()}, ${mMonth}, ${mDay}, ${mWeekday}`;
    document.getElementById('mahi-current-date').textContent = currentDateString;

    document.getElementById('mahi-persian-month').textContent = `Mahi in Persian: ${now.getFullYear()}, ${months.persian_name[mMonth-1]}, ${mDay}, ${mWeekday}`;
    document.getElementById('mahi-latin-month').textContent = `Mahi in Gregorian: ${now.getFullYear()}, ${months.latin_name[gMonth-1]}, ${gDay}, ${gWeekday}`;
}

setInterval(updateMahiTime, 1);
updateMahiTime();
