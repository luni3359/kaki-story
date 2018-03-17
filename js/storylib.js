function askWord(funct, text, description) {
    OPTIONS.type = 'text';
    OPTIONS.contents = [
        {
            text: text,
            event: funct,
            description: description
        }
    ];
}

function setOption(funct, text, description) {
    if (OPTIONS.type !== 'button') {
        OPTIONS.type = 'button';
        OPTIONS.contents = [];
    }

    OPTIONS.contents.push(
        {
            text: text,
            event: funct,
            description: description
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
        message = autoFormat(message);
        instantWrite(message);
        return;
    }

    if (!position || position === 0) {
        position = 0;

        message = autoFormat(message);
        beginWrite(message);
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
        stopWrite();
    }
}
