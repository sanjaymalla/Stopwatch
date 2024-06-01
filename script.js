document.addEventListener('DOMContentLoaded', () => {
    const watch = document.getElementById('watch')
    const start = document.getElementById('start')
    const stop = document.getElementById('stop')
    const reset = document.getElementById('reset')

    let timerInterval;
    let elapsedTime = 0
    let running = false
    let startTime
    const updateStopwatch = () => {
        const currentTime = Date.now()
        const timeDifference = running ? (currentTime - startTime) + elapsedTime : elapsedTime
        const hours = Math.floor(timeDifference / 3600000);
        const minutes = Math.floor((timeDifference % 3600000) / 60000);
        const seconds = Math.floor((timeDifference % 60000) / 1000);
        const milliseconds = timeDifference % 1000

        const formattedHours = String(hours).padStart(2, '0');
        const formattedMinutes = String(minutes).padStart(2, '0');
        const formattedSeconds = String(seconds).padStart(2, '0');
        const formattedMilliseconds = String(milliseconds).padStart(3, '0')
        watch.textContent = `${formattedHours}:${formattedMinutes}:${formattedSeconds}.${formattedMilliseconds}`
    }

    const startStopwatch = () => {
        startTime = Date.now()
        running = true
        timerInterval = setInterval(updateStopwatch, 10)
        
        start.disabled = true
        stop.disabled = false
        reset.disabled = false
    }
    const stopStopwatch = () => {
        elapsedTime += Date.now() - startTime;
        running = false;
        clearInterval(timerInterval);

        start.disabled = false;
        stop.disabled = true;
    };

    const resetStopwatch = () => {
        clearInterval(timerInterval);
        elapsedTime = 0;
        running = false;
        updateStopwatch();

        start.disabled = false;
        stop.disabled = true;
        reset.disabled = true;
    };

    start.addEventListener('click', startStopwatch);
    stop.addEventListener('click', stopStopwatch);
    reset.addEventListener('click', resetStopwatch);
})