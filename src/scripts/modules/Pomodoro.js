const Pomodoro = function () {

    const OPTIONS = {};

    let seconds = 0,
        intervalLength,
        timer,
        // initalize var to hold timer states: 0 = not on/paused, 1 = work, 2 = rest
        currentTimerState = 0,
        savedTimerState,
        startTime;

    function set(option, setting) {
        OPTIONS[option] = setting;
    }

    function minutesToSeconds(input) {
        // we need to convert minute input to seconds so we can countdown the time by second
        return input * 60;
    }

    function getDateAsSeconds() {
        // quickly get teh current date/time in seconds  to use in calculations
        return new Date().getTime() / 1000;
    }

    function padDigit(input) {
        //  make sure our output is formated mm:ss
        if (input < 10) {
            return '0' + input;
        }
        return input;
    }

    function swapTimerModes() {
        // swap between work and rest modes
        if (currentTimerState === 1) {
            currentTimerState = 2;
        } else {
            currentTimerState = 1;
        }
    }

    function createNoticeMessage() {
        let stateEnd,
            stateStart,
            startingStateIcon;
        // based on the current timerstate we format a message to pass to users when it ends
        if (currentTimerState === 1) {
            stateEnd = 'Work';
            stateStart = 'resting';
            startingStateIcon = '/assets/images/coffee.svg';
        } else {
            stateEnd = 'Rest';
            stateStart = 'working';
            startingStateIcon = '/assets/images/fire.svg';
        }

        const noticeTitle = stateEnd + ' state over, begin ' + stateStart;

        return {
            title: noticeTitle,
            icon: startingStateIcon
        }
    }

    function formatOutput(secondsInput) {
        // simple function to convert seconds on backend to minutes & seconds on frontend
        const secondsToDisplay = secondsInput % 60,
            minutesToDisplay = Math.floor(secondsInput / 60);
        return padDigit(minutesToDisplay) + ':' + padDigit(secondsToDisplay);
    }

    function calculateProgress() {
        const timePassed = intervalLength - seconds;
        return timePassed / intervalLength;
    }

    function updateDisplay(secondsInput = seconds) {
        OPTIONS.display.textContent = formatOutput(secondsInput);
    }

    function startTimer(value) {
        if (seconds === 0) {
            seconds = value;
        }
        startTime = getDateAsSeconds();
        timer = window.setInterval(decrement, 1000);
        // and which timer ui to show
        updateDisplay();
        determineTimerStateUi();
    }

    function pauseTimer() {
        window.clearInterval(timer);
    }

    function toggleStartOrPause() {
        // if the timer state is not set to pause (0) we will enter the if
        if (currentTimerState !== 0) {
            // we save the current state value work/break (1/2) set teh value to 0 and call pause 
            savedTimerState = currentTimerState;
            currentTimerState = 0;
            pauseTimer();
        } else {
            // otherwise we were paused or just starting so we need to get the saved state
            currentTimerState = savedTimerState || 1;
            // and determine whether to call teh timer with the work or break interval
            determineTimerToStart();
        }
    }

    function determineTimerToStart() {
        let input;
        // based on the current timer mode work/break (1/2) we call the startTimer with the alternate value
        switch (currentTimerState) {
            case 1:
                input = minutesToSeconds(OPTIONS.workInput.value);
                startTimer(input);
                intervalLength = input;
                break;
            case 2:
                input = minutesToSeconds(OPTIONS.breakInput.value);
                startTimer(input);
                intervalLength = input;
                break;
        }
    }

    function decrement() {
        seconds--;
        OPTIONS.progressUpdate(calculateProgress());
        updateDisplay();
        checkTimer();
    }

    function resetTimer() {
        window.clearInterval(timer);
        seconds = 0;
        currentTimerState = 0;
        savedTimerState = 0;
        updateDisplay();
        OPTIONS.progressUpdate(0);
        determineTimerStateUi();
    }

    function checkTimer() {
        // check the time remaining in our timer
        // if it is over (0), then call these
        if (seconds === 0) {
            swaptimerState();
        }
    }

    function swaptimerState() {
        // pause our async interval
        pauseTimer();
        // notify the user of state end and state begin
        OPTIONS.stateSwapMessage(createNoticeMessage());
        // optional function to log actual seconds passed during last interval
        logCorrectness();
        // swap mode to the one not being used, and call start with thecorrect input depending on teh
        swapTimerModes();
        determineTimerToStart();
    }

    function determineTimerStateUi() {
        switch (currentTimerState) {
            case 0:
                OPTIONS.display.classList.add('clock__display--pulse');
                OPTIONS.timerStateIcon.classList.replace('fa-coffee', 'fa-fire');
                OPTIONS.progressBar.classList.remove('clock__progress--break');
                break;
            case 1:
                OPTIONS.timerStateIcon.classList.replace('fa-coffee', 'fa-fire');
                OPTIONS.progressBar.classList.remove('clock__progress--break');
                OPTIONS.display.classList.remove('clock__display--pulse');
                break;
            case 2:
                OPTIONS.timerStateIcon.classList.replace('fa-fire', 'fa-coffee');
                OPTIONS.progressBar.classList.add('clock__progress--break');
                OPTIONS.display.classList.remove('clock__display--pulse');
                break;
        }

    }

    function logCorrectness() {
        const endTime = getDateAsSeconds(),
            timePassed = Math.round(endTime - startTime);
        console.log(timePassed + ' seconds have passed');
    }

    return {
        set: set,
        toggleStartOrPause: toggleStartOrPause,
        resetTimer: resetTimer
    }

};

export default Pomodoro;