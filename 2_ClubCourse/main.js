var topic = [
    "School has not yet started",
    "National Holiday",
    "Prepare environment",
    "Randomness",
    "Repeatability"
];


$("#startDate").on("change", function() {
// Get the selected date from the input field
var startDate = new Date($(this).val());

var millisecsPerDay = 24 * 60 * 60 * 1000;

// Clear the table
$("#courseTable").empty();

// Add table header
$("#courseTable").append(
    "<tr><th>Sessions</th><th>Time</th><th>Theme</th></tr>"
);

// Generate course schedule
var topicCount = topic.length;
for (var x = 0; x < topicCount; x++) {
    var rowClass = x % 2 === 0 ? "even-row" : "odd-row";
    
    if (topic[x] === "National Holiday") {
        rowClass = "grey-row"; // Set row class to "grey-row"
    }

    $("#courseTable").append(
        `<tr class="${rowClass}">` +
        "<td>" + (x + 1) + "</td>" +
        "<td>" +
        new Date(
            startDate.getTime() + 7 * x * millisecsPerDay
        ).toLocaleDateString(undefined, {
            month: "numeric",
            day: "numeric"
        }) +
        "</td>" +
        "<td>" + topic[x] + "</td>" +
        "</tr>"
        );
    }
});

// Event listener for add button
$("#addBtn").on("click", function() {
    let newTopic = $("#newTopicInput").val(); // Get value from input field
    if (newTopic !== "") { // Check if input field is not empty
        topic.push(newTopic); // Add new topic to topic array
        updateTable(); // Update table with new data
        $("#newTopicInput").val(""); // Clear input field
    }

});

$(document).ready(function() {
    // Show the modal window on page load
    $("#myModal").css("display", "block");
  
    // Add click event listener for the close button
    $(".close").click(function() {
        // Hide the modal window when close button is clicked
        $("#myModal").css("display", "none");
    });
});