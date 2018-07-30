const story = $("#story");
const actionArea = $("#action-area");
const actionWrapper = actionArea.parent();
const continueButton = $("#continue-button");
const continueWrapper = continueButton.parent().parent();
const optionsWrapper = $("#multiple-options");

function addText(text) {
    story.html(text);
    // story.text(text);
}

function addContinue(sendAction) {
    continueButton.off("click");
    continueButton.on("click", sendAction);
    continueButton.removeClass("d-none");
    continueWrapper.attr("class", "col-lg-4");

    clearActionArea();
}

function addOptions() {
    // option example: ["Yes", callback, (optional)"btn-primary"]
    continueWrapper.attr("class", "col-lg-2");
    clearActionArea();
    optionsWrapper.empty();

    for (let option of arguments) {
        let optionLabel = option[0];
        let optionCallback = option[1];
        let optionColor = option[2] || "btn-primary";
        let buttonElement = $(document.createElement("button"));

        buttonElement.attr("class", "btn " + optionColor);
        buttonElement.text(optionLabel);
        buttonElement.on("click", optionCallback);

        optionsWrapper.append(buttonElement);
    }

    continueButton.addClass("d-none");
    optionsWrapper.removeClass("d-none");
}

function addInput(caption, id, sendAction) {
    let inputGroup = $(document.createElement("div"));
    let inputGroupPrepend = $(document.createElement("div"));
    let inputGroupText = $(document.createElement("span"));
    let inputText = $(document.createElement("input"));

    inputText.addClass("form-control");
    inputGroupText.addClass("input-group-text");
    inputGroupPrepend.addClass("input-group-prepend");
    inputGroup.addClass("input-group");

    inputText.attr("type", "text");
    inputText.attr("name", id);
    inputText.attr("id", id);
    inputText.on("keypress", function (e) {
        if (e.which == 13 && inputText.val() != "") {
            sendAction();
        }
    });

    continueButton.off("click");
    continueButton.on("click", sendAction);
    continueButton.removeClass("d-none");
    continueWrapper.attr("class", "col-lg-2");
    actionWrapper.attr("class", "col-lg-4");

    inputGroupText.text(caption);
    inputGroupPrepend.append(inputGroupText);
    inputGroup.append(inputGroupPrepend);
    inputGroup.append(inputText);

    actionArea.empty();
    actionArea.append(inputGroup);
}

function clearActionArea() {
    actionWrapper.attr("class", "");
    actionArea.empty();
}

function end() {
    let theEnd = $(document.createElement("h2"));

    theEnd.text("- THE END -");
    continueButton.addClass("d-none");
    continueWrapper.attr("class", "col-lg-4");
    optionsWrapper.addClass("d-none");

    continueButton.parent().append(theEnd);
}
