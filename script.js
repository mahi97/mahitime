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

function padZero(value) {
    return value < 10 ? `0${value}` : value;
}

function updateMahiTime() {
    const now = new Date();
    const mahiYearStart = new Date('2024-03-20T03:07:00');
    const elapsedMilliseconds = now - mahiYearStart;
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

    const currentTimeString = `Time: ${padZero(currentMahiHour)}:${padZero(currentMahiMinute)}:${padZero(currentMahiSecond)} ${period}`;
    document.getElementById('mahi-current-time').textContent = currentTimeString;

    let dayOfYear = currentMahiDayOfYear + 1;
    let month = "";
    let persianMonth = "";
    let latinMonth = "";
    let dayOfMonth = 0;
    let dayOfWeek = (dayOfYear - 1) + 3 % 7;

    for (let i = 0; i < months.length; i++) {
        if (dayOfYear > months[i].days) {
            dayOfYear -= months[i].days;
        } else {
            month = months[i].name;
            persianMonth = months[i].persian_name;
            latinMonth = months[i].latin_name;
            dayOfMonth = dayOfYear;
            break;
        }
    }

    const day_of_week = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];   

    const currentDateString = `${now.getFullYear()}, ${month}, ${dayOfMonth}, Day of Week: ${day_of_week[dayOfWeek]}`;
    document.getElementById('mahi-current-date').textContent = currentDateString;

    document.getElementById('persian-month').textContent = `Persian: ${persianMonth}`;
    document.getElementById('latin-month').textContent = `English: ${latinMonth}`;
    document.getElementById('seasonal-month').textContent = `Seasonal: ${month}`;
}

setInterval(updateMahiTime, 1);
updateMahiTime();
