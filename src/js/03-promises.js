import Notiflix from 'notiflix';
const form = document.querySelector('.form')
const btn = document.querySelector('button')

form.addEventListener('submit', hendleForn)

function hendleForn(event) {
  event.preventDefault()
    const { delay, step, amount } = event.currentTarget.elements
    let newDelay = +(delay.value)
    let newStep = +(step.value)
    let newAmount = +(amount.value)
    
    
    for (let i = 1; i < newAmount; i++) {
        
       createPromise(i, newDelay) 
        .then(({ position, delay }) => {
    Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
  })
  .catch(({ position, delay }) => {
    Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
  });
        newDelay += newStep
    }
}
function createPromise(position, delay) {
    return new Promise((resolve, reject) => {
        const shouldResolve = Math.random() > 0.3;
        setTimeout(() => {
            if (shouldResolve) {
                resolve({ position, delay })
  } else {
                reject({ position, delay })
  }
        }, delay)
    })
}


