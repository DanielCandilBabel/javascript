


// Functions
function count(miliseconds) {
    return new Promise(resolve => setTimeout(resolve, miliseconds))
}

export function addCounter(seconds, counters) {
    let c = 0;

    const counter = document.createElement('li');
    counter.textContent = `0/${seconds}`;

    const interval = setInterval(() => {
        c++;
        console.log(`counter: ${c}/${seconds}`)
        counter.textContent = `${c}/${seconds}`;
    }, 1000);
    counters.appendChild(counter);

    function stopCounter () {
        clearInterval(interval);
        counter.remove();
    }

    counter.onclick = stopCounter;

    count(seconds * 1000).then(stopCounter);
}

