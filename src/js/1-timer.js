// Описаний в документації
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';
// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

const timeDataEl = document.querySelector('#datetime-picker');

const btnTimerEl = document.querySelector('[data-start]');
const days = document.querySelector('[data-days]');
const hours = document.querySelector('[data-hours]');
const minutes = document.querySelector('[data-minutes]');
const seconds = document.querySelector('[data-seconds]');
const time = Date.now();
let userSelectedDate = null;
btnTimerEl.setAttribute('disabled', '');
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];

    if (userSelectedDate < time) {
      iziToast.error({
        title: 'Error',
        message: 'Illegal operation',
      });
      btnTimerEl.setAttribute('disabled', '');
    } else {
      btnTimerEl.removeAttribute('disabled', '');
    }
  },
};

btnTimerEl.addEventListener('click', () => {
  const intervalId = setInterval(
    () => {
      const timer = convertMs(userSelectedDate - Date.now());
      days.textContent = addLeadingZero(timer.days);
      hours.textContent = addLeadingZero(timer.hours);
      minutes.textContent = addLeadingZero(timer.minutes);
      seconds.textContent = addLeadingZero(timer.seconds);

      if (userSelectedDate - Date.now() <= 1000) {
        clearInterval(intervalId);
        timeDataEl.removeAttribute('disabled', '');
      }
    },
    1000,
    userSelectedDate,
    time
  );
  //
  btnTimerEl.setAttribute('disabled', '');
  timeDataEl.setAttribute('disabled', '');
});
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
function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}
flatpickr(timeDataEl, options);
