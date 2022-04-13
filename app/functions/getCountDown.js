const getCountDown = (millis, totalMillis) => {
    const remainingMillis = totalMillis - millis;
    const minutes = remainingMillis / 1000 / 60;
    const minutesDisplay = Math.floor(minutes);
    const seconds = Math.round((minutes - minutesDisplay) * 60);
    const secondsDisplay = seconds < 10 ? `0${seconds}` : seconds;
    return `-${minutesDisplay}:${secondsDisplay}`;
}

export default getCountDown