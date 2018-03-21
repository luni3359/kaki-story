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

    input.setAttribute('data-description', option.description);

    input.addEventListener('focus', showDescription);
    input.addEventListener('blur', hideDescription);

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
    clearOptions();
    hideDescription();

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

// automatically adds a space after a period if none exists (use it won't do it for triple periods but use the character instead)
function autoFormat(message) {
    const findRegex = /[\,\.\…\?\!]/;
    const artificialLimit = 500;
    let str = message.replace(/\.\.\./g, '…').trim();
    let pos = str.search(findRegex);
    message = '';

    let unloop = 0;
    do {
        if (str[++pos] !== ' ') {
            message += str.substring(0, pos) + ' ';
            str = str.slice(pos);

            pos = str.search(findRegex);
            unloop++;
        }
    } while (pos !== -1 && unloop < artificialLimit);

    if (unloop >= artificialLimit)
        throw new Error(`Poor coding technique to fixing problems: Loop seeked for more than ${artificialLimit} times for special characters.`);

    message = message.trim();

    if (message === '')
        message = str;

    return message;
}

function validateInput() {
    let response = getResponse().trim();
    return Boolean(response);
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

function removeClass(element, classname) {
    if (element.classList.contains(classname)) {
        element.classList.remove(classname);
    }
}

function addClass(element, classname) {
    if (!element.classList.contains(classname)) {
        element.classList.add(classname);
    }
}

function setup() {
    hideScrollbar();
}

function toggleReader() {
    STORY.settings.readEnabled = !STORY.settings.readEnabled;
    stopWrite();
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

    // OPTIONS.element.addEventListener('mousemove', (e) => {
    //     document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
    //     document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
    // });

    OPTIONS.element.addEventListener('mouseenter', (e) => {
        removeClass(OPTIONS.element, 'hidden');
    });

    OPTIONS.element.addEventListener('mouseleave', (e) => {
        addClass(OPTIONS.element, 'hidden');
    });

    STORY.element.addEventListener('click', () => {
        if (STORY.settings.readEnabled) doubleClickHandler(stopWrite);
    });
    window.addEventListener('resize', windowResize);

    main();
}

window.addEventListener('load', windowLoad);
