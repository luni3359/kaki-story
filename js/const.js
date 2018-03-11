const EVENTS = {
    timeout: 200, // Time in ms after which every timed-out event fires
    window: {
        resize: {
            id: null
        }
    },
    doubleclick: {
        target: null,
        timestamp: performance.now(),
        maxdelay: 1000 / 3
    }
};

const STORY = {
    element: document.querySelector('#story .cell'),
    data: {
        reading: false,
        currentMessage: ''
    },
    settings: {
        readEnabled: true,
        readSpeed: 1
    }
};

const DESCRIPTION = {
    element: document.querySelector('#description')
};

const OPTIONS = {
    element: document.querySelector('#options .cell'),
    type: null, // text / button
    contents: [
        {
            text: "Word here, if it's a phrase. Or a inner button.",
            event: function () {

            }
        }
    ]
};

const PLAYER = {
    name: null,
    setName: name => {
        PLAYER.name = name;
    }
};
