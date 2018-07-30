$(window).on("load", start);

function start() {
    addText(
        `Your vision is black. You see, know, hear, and feel nothing. Yet… No, you should be feeling something. In fact, you are!
        Your head hurts, and your clothes feel cool and moist all around… you’re wet. It’s raining all around
        you, with its soft, soothing song threatening to wake you up if your headache wasn’t so sharp. You’re
        sitting against something rough… bark. Your back is to a tree. You’re outside, sitting in the muddy dirt
        and grass. You carefully raise yourself onto your feet, holding onto the trunk of the tree for support,
        and take a moment to collect yourself. Your thoughts wander to yourself… yet… when you try to think of
        the past few events, nothing comes to your mind and you draw a complete blank. This is not right. You
        wrack your aching brain for answers about where you are and what you’re doing here, but every question
        results in complete blankness. Starting to panic a little, you try to at the very least remember your
        name. What is your name?`
    );

    addInput("My name", "playerName", takeName);
}

function takeName() {
    player.name = $("#playerName").val();

    addText(
        `${player.name}. That is your name. You breathe a sigh of relief. At least you can remember that. Perhaps there may be a civilization or a
        passing traveler whom might be able to help you, however slim of a chance that may be. Calming down a
        little, you look down at yourself and inspect what’s left of your clothes and try to figure out who you
        were from the state of your being. What is your gender?`
    );
    addOptions(
        ["Male", () => { noticingSelf("male") }],
        ["Female", () => { noticingSelf("female") }]
    );
}

function noticingSelf(gender) {
    player.gender = gender;

    let text = `As if your unusually exposed form didn’t make it plain enough, you see that you’re a ${player.adultPronoun()}, but of course you knew that already. You are wearing`;
    if (gender === "male") {
        text += ` a light yellow shirt with a simple pattern of small, entwining diamonds ringed with leaves. The pattern circles around your waist,
            with smaller circles around your shoulders, leaving the rest plain. Your trousers are a light shade of tan. There are several rough tears and
            gashes dashing across the fabric of the shirt, the yellow mixing with reds, greens and browns.`;
    } else if (gender === "female") {
        text += ` a bright yellow tunic makes you feel like a radiant sun against the dark greens and browns of the forest floor around you. (FINISH LATER)`;
    }

    text += `<br><br>
        …And for whatever reason, you are barefoot. Your wounds have formed fresh scabs, meaning thankfully you won’t be bleeding any longer.
        Unfortunately, the muddy floor of a raining forest among who knows what else will probably have lead to some of these injuries becoming infected.
        Before you can think more of this, you become more aware of your surroundings. In front of you is a muddy road leading onwards to a location
        obscured by the towering army of bark and leaves.
        <br><br>
        And only people could have created this road.  You take a slow, deep breath, and begin to limp along the trail.
        You put all of your focus into your slow trip, taking each step carefully so as to not make more pain flare up from one of your cuts. You find a convenient
        distraction from your cuts by realizing that you have a foggy memory, as if in a dream, of travelling along this path. You focus on this distant image
        in the back of your mind, but all that comes to you are how you felt at the time.
        <br><br>
        You had to leave. There was too much blood being lost. You’d have been found if you stayed any longer, anyhow.
        <br><br>
        …And like that, the image slips from your grasp, and your memory once more trails off.`;

    addText(text);
    end();
}
