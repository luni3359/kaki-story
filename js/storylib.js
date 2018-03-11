function askWord(message, funct, buttonText) {
    OPTIONS.type = 'text';
    OPTIONS.contents = [
        {
            text: message,
            caption: buttonText,
            event: funct
        }
    ];
}

function setOption(text, funct) {
    if (OPTIONS.type !== 'button') {
        OPTIONS.type = 'button';
        OPTIONS.contents = [];
    }

    OPTIONS.contents.push(
        {
            text: text,
            event: funct
        }
    );
}

// get what the user says with this!
function getResponse() {
    return OPTIONS.element.querySelector('input[type="text"]').value;
}

// Use this to write a paragraph, or a word!
function writeOut(message, position, tagToAppendTo) {
    if (!STORY.settings.readEnabled) {
        STORY.data.reading = false;
        STORY.element.innerHTML = message;
        return;
    }

    if (!position || position === 0) {
        position = 0;
        STORY.data.reading = true;
        STORY.data.currentMessage = message;
        STORY.element.innerHTML = '';

        clearOptions();
    }

    if (position < message.length) {
        let char = message[position++];
        let delay; // in miliseconds

        if (!STORY.data.reading) return;

        switch (char) {
            // catch tag name in the brackets
            case '<':
                if (!tagToAppendTo) {
                    return printHTMLTagWrite(message, position);
                }

                while (char !== '>') {
                    char = message[position++];
                }

                char = message[position++];

                tagToAppendTo = null;
                break;

            case '…':
                delay = 850;
                break;

            case '.':
                delay = 500;
                break;

            case ',':
                delay = 150;
                break;

            case ' ':
                delay = 25;
                break;

            default:
                delay = 15;
        }

        if (char) {
            if (tagToAppendTo) {
                tagToAppendTo.innerHTML += char;
            } else {
                STORY.element.innerHTML += char;
            }
        }

        continueWrite(message, position, delay, tagToAppendTo);
    } else {
        presentOptions();
    }
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
