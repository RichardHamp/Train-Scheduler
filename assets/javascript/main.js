
$(document).ready (function(){
 
    var name;
    var destination;
    var firstTrain;
    var frequency = 0;

database.ref ().on ("child_added", function (childInfo){
   
        var firstTrainNew = moment (childInfo.val ().firstTrain, "hh:mm");
        var timeDifference = moment ().diff (moment(firstTrainNew), "minutes");
        var minutesAway = childInfo.val ().frequency - timeDifference % childInfo.val ().frequency;
        var nextArrival = moment ().add (minutesAway, "minutes").format ("hh:mm");

        console.log(firstTrainNew);
        console.log(timeDifference);
        console.log(minutesAway);
        console.log(nextArrival);

        $("tbody").prepend ("<tr><td>" + childInfo.val ().name +
                "</td><td>" + childInfo.val ().destination +
                "</td><td>" + childInfo.val ().frequency +
                "</td><td>" + nextArrival + 
                "</td><td>" + minutesAway + "</td></tr>");
    });

        $("#addTrainBtn").on ("click", function () {
        event.preventDefault ();
        name = $("#trainNameInput").val ().trim ();
        destination = $("#destinationInput").val ().trim ();
        firstTrain = $("#firstTrainInput").val ().trim ();
        frequency = $("#frequencyInput").val ().trim ();

        database.ref ().push ({
            name: name,
            destination: destination,
            firstTrain: firstTrain,
            frequency: frequency,
            dateAdded: firebase.database.ServerValue.TIMESTAMP
        });
        $("form")[0].reset ();
    });
});