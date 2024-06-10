function updateMahiTime() {
    const now = new Date();
    const mahiSecond = 0.431105536;
    const mahiMinute = 100 * mahiSecond;
    const mahiHour = 100 * mahiMinute;
    const mahiDay = 20 * mahiHour;

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

    const currentTimeString = `Year: ${now.getFullYear()}, Day: ${currentMahiDayOfYear + 1}, Time: ${currentMahiHour}:${currentMahiMinute}:${currentMahiSecond}`;
    document.getElementById('mahi-current-time').textContent = currentTimeString;
}

setInterval(updateMahiTime, 1000);
updateMahiTime();
