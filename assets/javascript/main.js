

$(document).ready(function () {
    console.log(moment());
    $("#trainNameInput").val("");
    $("#destinationInput").val("");
    $("#firstTrainInput").val("");
    $("#frequencyInput").val("");

    $("#addTrainBtn").on("click", function () {
        event.preventDefault();
        alert("clicked");
        var trainName = $("#trainNameInput").val().trim();
        var destination = $("#destinationInput").val().trim();
        var firstTrain = $("#firstTrainInput").val().trim();
        var frequency = $("#frequencyeInput").val().trim();
        console.log(trainName),(destination),(firstTrain)(frequency);
    })
});