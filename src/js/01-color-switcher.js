const start = document.querySelector('button[data-start]');
const stop = document.querySelector('button[data-stop]');
const body = document.querySelector('body');


start.addEventListener('click', startClick);
stop.addEventListener('click', stopClick);

let timerId = null;
stop.disabled = true

function startClick() {
    function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
    }
    timerId = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor()
    start.disabled = true
    stop.disabled = false
    }, 1000)
}

function stopClick() {
    clearInterval(timerId)
    start.disabled = false
    stop.disabled = true
}





