import flatpickr from "flatpickr";
import Notiflix from 'notiflix';
import "flatpickr/dist/flatpickr.min.css";





const inputHendle = document.querySelector('#datetime-picker')
const btn = document.querySelector('[data-start]')
const day = document.querySelector('[data-days]')
const hour = document.querySelector('[data-hours]')
const minute = document.querySelector('[data-minutes]')
const second = document.querySelector('[data-seconds]')


let intervalId = null;
let selectedDate = null;
let currentDate = null;
let timeToEnd = 0;

btn.disabled = true

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
     selectedDate = selectedDates[0].getTime()
     newDate = new Date().getTime()
    if (newDate > selectedDate) {
      Notiflix.Notify.failure("Please choose a date in the future");
    } else {
      btn.disabled = false

    }
  },
};

flatpickr(inputHendle, options);


btn.addEventListener('click', clickBtn)

function clickBtn() {
  intervalId = setInterval(() => {
    currentDate = new Date().getTime();
    if (selectedDate - currentDate <= 1000) {
      clearInterval(intervalId);
      btn.disabled = true;
      inputHendle.disabled = false;
      return;
    } else {
      btn.disabled = true;
      inputHendle.disabled = true;
      currentDate += 1000;
      timeToEnd = selectedDate - currentDate;
      convertMs(timeToEnd);
    }
  }, 1000);
}

function updateClock({ days, hours, minutes, seconds }) {
  day.textContent = days;
  hour.textContent = hours;
  minute.textContent = minutes;
  second.textContent = seconds;
}


function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  updateClock({ days, hours, minutes, seconds })
  return { days, hours, minutes, seconds };
}


