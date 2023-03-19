import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const startBtn = document.querySelector('button[data-start]');
const inputData = document.querySelector('#datetime-picker');
let intervalId = null;
let selectedDate = Date.now();

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedDate = selectedDates[0];
    if (new Date() > selectedDates[0]) {
      startBtn.disabled = true;
      Notiflix.Notify.failure('Please choose a date in the future');
    } else {
      startBtn.disabled = false;
    }
  },
};

flatpickr(inputData, options);

startBtn.setAttribute('disabled', '');

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

startBtn.addEventListener('click', () => {
  startBtn.disabled = true;
  inputData.disabled = true;
  intervalId = setInterval(timeEnd, 1000);
});

function timeEnd() {
  const timeCountdown = selectedDate - new Date();
  if (timeCountdown <= 0) {
    clearInterval(intervalId);
    return;
  }

  const { days, hours, minutes, seconds } = convertMs(timeCountdown);

  document.querySelector('span[data-days]').textContent = addLeadingZero(days);
  document.querySelector('span[data-hours]').textContent =
    addLeadingZero(hours);
  document.querySelector('span[data-minutes]').textContent =
    addLeadingZero(minutes);
  document.querySelector('span[data-seconds]').textContent =
    addLeadingZero(seconds);
}

function addLeadingZero(value) {
  return value.toString().padStart(2, 0);
}
