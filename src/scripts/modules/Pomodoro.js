const Pomodoro = (function () {

    const timerInput = document.getElementById('clock_input');
    let seconds = 0,
        startTime,
        timer;

    events();

    function events() {
        document.getElementById('clock_start').addEventListener('click', (event) => {
            startTimer(timerInput.value);
        });
    }

    function startTimer(value) {
        startTime = new Date().getTime() / 1000;
        seconds = 0;
        timer = window.setInterval(increment, 1000, value);
    }

    function increment(input) {
        updateDisplay(input);
        checkTimer(input);
    }

    function updateDisplay(input) {
        seconds++;
        document.getElementById('clock_display').textContent = seconds;
    }

    function checkTimer(input) {
        if (seconds === Number(input)) {
            timerDone();
        }
    }

    function timerDone() {
        window.clearInterval(timer);
        checkCorrectness();
    }

    function checkCorrectness() {
        const endTime = new Date().getTime() / 1000,
            timePassed = Math.round(endTime - startTime);

        console.log(timePassed + ' seconds passed');
    }

})();

export default Pomodoro;