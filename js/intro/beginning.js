function gameNewStart() {
    // writeOut automatically clears any previous text, and prints what  you type inside
    // if you enclose your text within backticks you can write in multiple lines! :gp_grin:
    writeOut(`Your vision is black. You see, know, hear, and feel nothing. Yet… No, you should be feeling something.
    In fact, you are! Your head hurts, and your clothes feel cool and moist all around… you’re wet. It’s raining all around
    you, with its soft, soothing song threatening to wake you up if your headache wasn’t so sharp. You’re
    sitting against something rough… bark. Your back is to a tree. You’re outside, sitting in the muddy dirt
    and grass. You carefully raise yourself onto your feet, holding onto the trunk of the tree for support,
    and take a moment to collect yourself. Your thoughts wander to yourself… yet… when you try to think of
    the past few events, nothing comes to your mind and you draw a complete blank. This is not right. You
    wrack your aching brain for answers about where you are and what you’re doing here, but every question
    results in complete blankness. Starting to panic a little, you try to at the very least remember your name.<br><br>
    <b>What is your name?</b>`);

    /* askWord works for asking a word!
    * the button says OK by default if you don't specify a word (null)
    * syntax -> askWord(event, 'Say spell.', 'This is a description for the spell.'); */
    askWord(whatIsYourName, null, `I won't lie about this.`);
}

function whatIsYourName() {
    let name = getResponse(); // This is how you get any text the user added

    PLAYER.setName(name);

    // additionally, backticks allow you to use variable names in a string without having to do nasty concatenation
    writeOut(`<i>${PLAYER.name}</i>. That is your name. You breathe a sigh of relief. At least you can remember that. Perhaps there
    may be a civilization or a passing traveler whom might recognize you, however slim of a chance that may be. Calming down a little,
    you look down at yourself and inspect your clothes and try to figure out who you were from the state of your being. <br><br><b>
    What is your gender?</b>`);


    // good example to get how options work
    setOption(() => {
        alert('wrong choice');
    }, 'Male', 'Am I a boy...?');

    setOption(() => {
        alert('NICE BRA');
    }, 'Female', 'Clearly I am a girl!');
}
