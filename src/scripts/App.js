import Pomodoro from './modules/Pomodoro';
import Popup from './modules/Popup';
import Modal from './modules/Modal';
import ProgressBar from 'progressbar.js';
// create arg to take callback array and call each in isDone
const Clock = new Pomodoro(),
    PopupNotification = new Popup(),
    OptionsModal = new Modal(),
    circle = new ProgressBar.Circle('#clock-progress', {
        color: '#FCB03C',
        duration: 3000,
        easing: 'easeInOut',
        strokeWidth: 6
    });

PopupNotification.getPermission();

Clock.set('stateSwapMessage', PopupNotification.notify);
Clock.set('progressUpdate', circle.set.bind(circle));
Clock.set('display', document.getElementById('clock-display'));
Clock.set('progressBar', document.getElementById('clock-progress'));
Clock.set('workInput', document.getElementById('work-interval'));
Clock.set('breakInput', document.getElementById('break-interval'));
Clock.set('timerStateIcon', document.getElementById('clock-state-icon'));

OptionsModal.setElement(document.getElementById('clock-config'));
OptionsModal.close();

document.getElementById('clock-display').addEventListener('click', (event) => {
    Clock.toggleStartOrPause();
});

document.getElementById('clock-reset').addEventListener('click', (event) => {
    Clock.resetTimer();
});

document.getElementById('clock-config-toggle').addEventListener('click', (event) => {
    OptionsModal.toggle();
});

