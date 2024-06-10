const mahiSecond = 0.431105536;
const mahiMinute = 100 * mahiSecond;
const mahiHour = 100 * mahiMinute;
const mahiDay = 20 * mahiHour;
const mahiYear = 366 * mahiDay;

const seasons = ["Spring", "Summer", "Autumn", "Winter"];
const months = [
    { name: "Spring Month 1", days: 31 },
    { name: "Spring Month 2", days: 31 },
    { name: "Spring Month 3", days: 31 },
    { name: "Summer Month 1", days: 31 },
    { name: "Summer Month 2", days: 31 },
    { name: "Summer Month 3", days: 31 },
    { name: "Autumn Month 1", days: 30 },
    { name: "Autumn Month 2", days: 30 },
    { name: "Autumn Month 3", days: 30 },
    { name: "Winter Month 1", days: 30 },
    { name: "Winter Month 2", days: 30 },
    { name: "Winter Month 3", days: 30 },
];

function updateMahiTime() {
    const now = new Date();
    const mahiYearStart = new Date(now.getFullYear(), 0, 1);
    const elapsedMilliseconds = now - mahiYearStart;
    const elapsedMahiDays = elapsedMilliseconds / (mahiDay * 1000);
    const currentMahiDayOfYear = Math.floor(elapsedMahiDays);
    const remainingDayFraction = elapsedMahiDays - currentMahiDayOfYear;

    const currentMahiHour = Math.floor(remainingDayFraction * 20);
    const remainingHourFraction = (remainingDayFraction * 20) - currentMahiHour;

    const currentMahiMinute = Math.floor(remainingHourFraction * 100);
    const remainingMinuteFraction = (remainingHourFraction * 100) - currentMahiMinute;

    const currentMahiSecond = Math.floor(remainingMinuteFraction * 100);
    const currentMahiMillisecond = Math.floor((remainingMinuteFraction * 100 - currentMahiSecond) * 1000);

    const currentTimeString = `Time: ${currentMahiHour}:${currentMahiMinute}:${currentMahiSecond}:${currentMahiMillisecond}`;
    document.getElementById('mahi-current-time').textContent = currentTimeString;

    let dayOfYear = currentMahiDayOfYear + 1;
    let month = "";
    let dayOfMonth = 0;
    let seasonIndex = 0;
    let dayOfWeek = (dayOfYear - 1) % 10;

    for (let i = 0; i < months.length; i++) {
        if (dayOfYear > months[i].days) {
            dayOfYear -= months[i].days;
        } else {
            month = months[i].name;
            dayOfMonth = dayOfYear;
            break;
        }
    }

    const currentDateString = `Year: ${now.getFullYear()}, Month: ${month}, Day: ${dayOfMonth}, Day of Week: ${dayOfWeek}`;
    document.getElementById('mahi-current-date').textContent = currentDateString;
}

setInterval(updateMahiTime, mahiSecond * 1000);
updateMahiTime();
