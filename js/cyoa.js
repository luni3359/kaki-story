function rnd() {
    return Math.floor(Math.random() * 256);
}

function makeOption(text) {
    let option = document.createElement('button');
    option.classList.add('option');
    option.innerText = text || '';

    return option;
}

function showOptions(howmany) {
    let choose = document.querySelector('#options .cell');

    while(choose.hasChildNodes()) {
        choose.removeChild(choose.lastChild);
    }

    for(let i = 0; i < howmany; i++) {
        let option = makeOption(`option ${i + 1}`);
        choose.appendChild(option);
    }
}

window.addEventListener('load', () => {
    showOptions(20);
});
