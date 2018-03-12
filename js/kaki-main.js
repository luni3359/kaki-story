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

function createButton(option, isInputOtherwiseIndex) {
    let button = makeElement('button');

    button.setAttribute('data-description', option.description || "Please write a description for me! I need to be read by a human to be happy... It's my only purpose after all.");

    if (!option.text) {
        if (isInputOtherwiseIndex === true) {
            button.innerHTML = 'OK';
        } else {
            button.innerHTML = `Unnamed button #${isInputOtherwiseIndex}`;
        }
    } else {
        button.innerHTML = option.text;
    }

    button.addEventListener('click', option.event);
    button.addEventListener('mouseover', showDescription);
    button.addEventListener('mouseleave', hideDescription);

    return button;
}

function createButtonOptions() {
    for (let i = 0; i < OPTIONS.contents.length; i++) {
        let option = OPTIONS.contents[i];
        let button = createButton(option, i + 1);

        OPTIONS.element.appendChild(button);
    }
}

function createTextOption() {
    let option = OPTIONS.contents[0];
    let input = makeElement('text');
    let button = createButton(option, true);

    // if Enter key is pressed
    input.addEventListener('keydown', (e) => {
        if (e.keyCode === 13) // Enter key
            option.event(); // ... then execute funct
    });

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

function beginWrite(message) {
    STORY.data.reading = true;
    STORY.data.currentMessage = message;
    STORY.element.innerHTML = '';

    clearOptions();
    hideDescription();
}

function continueWrite(message, position, delay, tag) {
    if (tag) {
        setTimeout(() => {
            writeOut(message, position, tag);
        }, delay / STORY.settings.readSpeed);
    } else {
        setTimeout(() => {
            writeOut(message, position);
        }, delay / STORY.settings.readSpeed);
    }
}

// This fully completes text that is showing
function stopWrite() {

    // if there's nothing to instantly show...
    if (STORY.data.currentMessage === '') return;

    STORY.data.reading = false;
    STORY.element.innerHTML = STORY.data.currentMessage;
    STORY.data.currentMessage = '';

    presentOptions();
}

function instantWrite(message) {
    STORY.data.reading = false;
    STORY.element.innerHTML = message;

    setTimeout(presentOptions, 5);
}

function printHTMLTagWrite(message, position) {
    let tagName = ''
    let char = message[position++];

    // start of tag until it hits end of start tag
    do {
        tagName += char;
        char = message[position++];
    } while (char !== '>');

    // if it's a line break...
    if (tagName === 'br') {
        STORY.element.innerHTML += '<br>';
        return writeOut(message, position);
    }

    // tag identified, make an element of it!
    let tag = makeElement(tagName);
    STORY.element.appendChild(tag); // add to story element

    writeOut(message, position, tag);
}

function showDescription() {
    let option = this;
    DESCRIPTION.element.innerHTML = option.getAttribute('data-description');
}

function hideDescription() {
    DESCRIPTION.element.innerHTML = '';
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
