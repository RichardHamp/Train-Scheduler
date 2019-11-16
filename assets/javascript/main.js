//Train Scheduler
$(document).ready(function () {

    //Global Variables
    var name;
    var destination;
    var firstTrain;
    var frequency = 0;

    //Triggers when new train is pushed to firebase
    database.ref().on("child_added", function (childInfo) {

        var firstTrainNew = moment(childInfo.val().firstTrain, "hh:mm");
        var timeDifference = moment().diff(moment(firstTrainNew), "minutes");
        var minutesAway = childInfo.val().frequency - timeDifference % childInfo.val().frequency;
        var nextArrival = moment().add(minutesAway, "minutes").format("hh:mm");

        //puts train at top of list
        $("tbody").prepend("<tr><td>" + childInfo.val().name +
            "</td><td>" + childInfo.val().destination +
            "</td><td>" + childInfo.val().frequency +
            "</td><td>" + nextArrival +
            "</td><td>" + minutesAway + "</td></tr>");
    });

    //Add train function
    $("#addTrainBtn").on("click", function () {
        //captures form input
        event.preventDefault();
        name = $("#trainNameInput").val().trim();
        destination = $("#destinationInput").val().trim();
        firstTrain = $("#firstTrainInput").val().trim();
        frequency = $("#frequencyInput").val().trim();

        //pushes to firebase
        database.ref().push({
            name: name,
            destination: destination,
            firstTrain: firstTrain,
            frequency: frequency,
            dateAdded: firebase.database.ServerValue.TIMESTAMP
        });
        //resets form for next train
        $("form")[0].reset();
    });
});