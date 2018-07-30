const player = {
    name: null,
    gender: null,
    adultPronoun: () => {
        let pronoun = "indeterminate";

        if (player.gender === "male") {
            pronoun = "man";
        } else if (player.gender === "female") {
            pronoun = "woman";
        }

        return pronoun;
    }
};
