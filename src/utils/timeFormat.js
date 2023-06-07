export const formatTime = (timeInMilliseconds) => {
    const ms = String(Math.floor(timeInMilliseconds % 1000)).padStart(3, '0').charAt(0);
    const seconds = String(Math.floor((timeInMilliseconds / 1000) % 60)).padStart(2, '0');
    const minutes = String(Math.floor((timeInMilliseconds / 1000 / 60) % 60)).padStart(2, '0');
    const hours = String(Math.floor((timeInMilliseconds / 1000 / 3600) % 24)).padStart(2, '0');
    // return `${hours}:${minutes}:${seconds}:${ms}`;
    return [hours, minutes, seconds, ms];
};