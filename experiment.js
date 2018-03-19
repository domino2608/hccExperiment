var resultObj = {};
var state = 'pretrial';
var currentTrialType = -1;
var trialQueue = [];
var startTime;

$(document).ready(function () {
    $("#startExperiment").click(function () {
        startExperiment();
        return false;
    });


    $("#downloadBtn").click(function () {
        download();
    });

    $("#lastModalBtn").click(function () {
        $("#firstExperiment").hide();
        $("#lastScreen").show();
    });

    $(document).keydown(function (key) {

        console.log(key.which);
        if (state === 'pretrial') {
            if (key.which === 32) {
                $("#startTrial").click();
            }
        }
        if (key.which === 49) {

            getAndPressProperKey(".first_option");
        } else if (key.which === 50) {

            getAndPressProperKey(".second_option");
        } else if (key.which === 51) {

            getAndPressProperKey(".third_option");
        } else if (key.which === 52) {

            getAndPressProperKey(".fourth_option");
        }
    });

    trialQueue = shuffle([1, 1, 1, 1, 2, 2, 2, 2])

});


function startExperiment() {
    resultObj.name = $("#name").val();
    resultObj.age = $("#age").val();

    $("#firstScreen").hide();
    $("#middleScreen").show();
    nextTrial();
}


function nextTrial() {
    if (trialQueue.length === 0) {
        download();
    } else {
        currentTrialType = trialQueue.pop();
        if (currentTrialType === 1) {
            $("#numDesc").show();
            $("#alphaDesc").hide();
        } else {
            $("#numDesc").hide();
            $("#alphaDesc").show();
        }
    }

}

function startTrial() {
    $("#middleScreen").hide();
    $("#firstExperiment").show();
    startTime = performance.now();
    state = 'trial'
}

function saveResult() {
    var endTime = performance.now();
    //resultObj.time = endTime - startTime;
    state = 'pretrial';
    $("#second").hide();
    $("#third").hide();
    $("#fourth").hide();
    $("#firstExperiment").hide();
    $("#middleScreen").show();
    nextTrial();
    console.log(resultObj);
}

function download() {
    var name = resultObj.name + '_' + resultObj.age + '.txt';
    var text = "Name and surname\tAge\tTime of experiment\n" +
        resultObj.name + "\t" + resultObj.age + "\t" + resultObj.time;

    var a = $("#downloadBtn");
    var file = new Blob([text], {type: 'text/plain'});
    $(a).attr("href", URL.createObjectURL(file));
    $(a).attr("download", name);
    $(a).click();
}

function wrong() {
    $("#wrongModal").modal();

    return false;
}

function right(nextId) {
    if (nextId === 'last') {
        saveResult();

        //$("#lastModal").modal();
    } else {
        $(nextId).show();
    }

    return false;
}

function getAndPressProperKey(keyClass) {
    var btnArr = $(keyClass + ":visible");
    var btnToClick = $(btnArr).last();
    console.log(btnToClick);

    $(btnToClick).click();
}

/// UTILITY FUNCTIONS

/** Knuth Unbiased Shuffle https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array**/
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

