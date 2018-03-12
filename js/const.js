const EVENTS = {
    timeout: 200, // Time in ms after which every timed-out event fires
    window: {
        resize: {
            id: null // id for the Timeout event
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
        readEnabled: false,
        readSpeed: 1
    }
};

const DESCRIPTION = {
    element: document.querySelector('#description .cell')
};

const OPTIONS = {
    element: document.querySelector('#options .cell'),
    type: null, // text / button
    contents: [
        {
            text: 'Text inside the button.',
            event: function () {},
            description: 'Description on mouse over.'
        }
    ]
};

const PLAYER = {
    name: null,
    setName: name => {
        PLAYER.name = name;
    }
};
