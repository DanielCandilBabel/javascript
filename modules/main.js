import * as myCounter from './counter.js';

const [input, button, counters] = document.querySelectorAll('input, button, #counters');
// Events
input.onkeyup = (e) => {
    const seconds = e.target.value;

    button.textContent = seconds ? `Contar ${seconds} segundos` : 'Contar';

    if (e.key === 'Enter') {
        button.click();
    }
}

button.onclick = () => {
    if (input.value) {
        myCounter.addCounter(input.value, counters);
    }
    input.focus();
    input.select();
}