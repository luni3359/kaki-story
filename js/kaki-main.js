function makeElement(type) {
    let element = null;

    if (type === 'text') {
        element = document.createElement('input');
        element.setAttribute('type', 'text');
    } else {
        element = document.createElement(type);
    }

    return element;
}

function createButtonOptions() {
    for (let i = 0; i < OPTIONS.contents.length; i++) {
        let button = makeElement('button');

        button.innerText = OPTIONS.contents[i].text;
        button.addEventListener('click', OPTIONS.contents[i].event);

        OPTIONS.element.appendChild(button);
    }
}

function createTextOption() {
    let input = makeElement('text');
    let button = makeElement('button');
    let textInpt = OPTIONS.contents[0];

    // if Enter key is pressed
    input.addEventListener('keydown', (e) => {
        if (e.keyCode === 13) // Enter key
            textInpt.event(); // ... then execute funct
    });

    button.innerHTML = textInpt.caption || 'OK';
    button.addEventListener('click', textInpt.event);

    OPTIONS.element.innerHTML = textInpt.text;
    OPTIONS.element.appendChild(input);
    OPTIONS.element.appendChild(button);
}

function presentOptions() {
    clearOptions();

    if (OPTIONS.type === 'text') {
        createTextOption();
    } else if (OPTIONS.type === 'button') {
        createButtonOptions();
    }
}

function clearOptions() {
    while (OPTIONS.element.hasChildNodes())
        OPTIONS.element.removeChild(OPTIONS.element.lastChild);
}

function hideScrollbar() {
    let scrollbarElement = document.querySelector('.cell'); // Random element with a scrollbar
    let scrollbarWidth = scrollbarElement.offsetWidth - scrollbarElement.clientWidth;

    // Change CSS variable to make sure the push is pixel-perfect, so it's hidden
    document.documentElement.style.setProperty('--game-scrollbar-width', `${scrollbarWidth}px`);
}

function setup() {
    hideScrollbar();
}

function doubleClickHandler(funct) {
    let clickTime = performance.now();
    let dt = clickTime - EVENTS.doubleclick.timestamp;

    EVENTS.doubleclick.timestamp = clickTime;

    if (dt < EVENTS.doubleclick.maxdelay) {
        funct();
    }
}

function windowResize() {
    // Cancel previous countdown and start a new one
    clearTimeout(EVENTS.window.resize.id);
    EVENTS.window.resize.id = setTimeout(setup, EVENTS.timeout);
}

function windowLoad() {
    setup();

    STORY.element.addEventListener('click', () => {
        if (STORY.settings.readEnabled) doubleClickHandler(stopWrite);
    });
    window.addEventListener('resize', windowResize);

    main();
}

window.addEventListener('load', windowLoad);
