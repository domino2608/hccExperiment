var resultObj = {};
var state = 'initial';
var currentTrialType = -1;
var trialQueue = [];
var startTime;

$(document).ready(function () {
    $("#startExperiment").click(function () {
        startExperiment();
        return false;
    });


    // $("#downloadBtn").click(function () {
    //     download();
    // });

    $(document).keydown(function (key) {

        console.log(key.which);
        if (state === 'pretrial') {
            if (key.which === 32) {
                $("#startTrial").click();
            }
        } else if (state === 'numtrial') {
            switch (key.which) {
                case 49:
                    getAndPressProperKey(".first_option");
                    break;
                case 50:
                    getAndPressProperKey(".second_option");
                    break;
                case 51:
                    getAndPressProperKey(".third_option");
                    break;
                case 52:
                    getAndPressProperKey(".fourth_option");
                    break;
            }
        } else if (state === 'alphatrial1') {
            switch (key.which) {
                case 66:
                    getAndPressProperKey(".first_option");
                    break;
                case 67:
                    getAndPressProperKey(".second_option");
                    break;
                case 73:
                    getAndPressProperKey(".third_option");
                    break;
                case 83:
                    getAndPressProperKey(".fourth_option");
                    break;
            }
        } else if (state === 'alphatrial2') {
            switch (key.which) {
                case 66:
                    getAndPressProperKey(".first_option");
                    break;
                case 79:
                    getAndPressProperKey(".second_option");
                    break;
                case 67:
                    getAndPressProperKey(".third_option");
                    break;
                case 77:
                    getAndPressProperKey(".fourth_option");
                    break;
            }
        } else if (state === 'alphatrial3') {
            switch (key.which) {
                case 66:
                    getAndPressProperKey(".first_option");
                    break;
                case 76:
                    getAndPressProperKey(".second_option");
                    break;
                case 80:
                    getAndPressProperKey(".third_option");
                    break;
                case 77:
                    getAndPressProperKey(".fourth_option");
                    break;
            }
        } else if (state === 'alphatrial4') {
            switch (key.which) {
                case 67:
                    getAndPressProperKey(".first_option");
                    break;
                case 75:
                    getAndPressProperKey(".second_option");
                    break;
                case 77:
                    getAndPressProperKey(".third_option");
                    break;
                case 73:
                    getAndPressProperKey(".fourth_option");
                    break;
            }
        }
    });

    trialQueue = shuffle([1, 1, 1, 1, 2, 2, 2, 2])

});


function startExperiment() {
    resultObj.name = $("#name").val();
    resultObj.age = $("#age").val();

    $("#firstScreen").hide();
    $("#middleScreen").show();
    state = 'pretrial';
    nextTrial();
}


function nextTrial() {
    if (trialQueue.length === 0) {
        download();
        state='final';
        $("#middleScreen").hide();
        $("#lastScreen").show();
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
    if (currentTrialType === 1) {
        state = 'numtrial';
        $("#numTrial").show();
    } else {
        state = 'alphatrial1';
        $("#alphaTrial").show();
    }
    startTime = performance.now();

}

function saveResult() {
    var endTime = performance.now();
    //resultObj.time = endTime - startTime;
    if (state === 'numtrial') {
        $("#numSecond").hide();
        $("#numThird").hide();
        $("#numFourth").hide();
        $("#numTrial").hide();
    } else {
        console.log("happened!");
        $("#alphaSecond").hide();
        $("#alphaThird").hide();
        $("#alphaFourth").hide();
        $("#alphaTrial").hide();
    }
    state = 'pretrial';
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
}

function wrong() {
    $("#wrongModal").modal();

    return false;
}

function right(nextId) {
    console.log('happened! ' + state + " " + nextId);
    if (nextId === 'last') {
        saveResult();

        //$("#lastModal").modal();
    } else {
        switch (state) {
            case "alphatrial1":
                state = "alphatrial2";
                break;
            case "alphatrial2":
                state = "alphatrial3";
                break;
            case "alphatrial3":
                state = "alphatrial4";
                break;
        }
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

/** Knuth Unbiased Shuffle from
 *  https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array**/
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

