let imageUrl = [
    "https://images.unsplash.com/photo-1623341214825-9f4f963727da?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    "https://images.unsplash.com/photo-1564834744159-ff0ea41ba4b9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1469&q=80",
    "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80"
];

let record = [];
let previousIndex = -1; // Initialize previous index as -1

$(function(){
    $("#showRandomFoodBtn").on("click",function(){
        var numberOfListItem = $("li").length;
        var randomChildIndex;
        do {
            randomChildIndex = Math.floor(Math.random()*numberOfListItem);
        } while (randomChildIndex === previousIndex); // Repeat until a new index is generated

        previousIndex = randomChildIndex; // Update previous index
        console.log(randomChildIndex);        
        $("h1").text($("li").eq(randomChildIndex).text());
        $("img").attr("src", imageUrl[randomChildIndex]);
    });
});


$(document).ready(function() {
    $("#addFoodBtn").click(function() {
        // Prompt user for input
        let foodItem = prompt("Please enter a food item:");
        if (foodItem) { // Check if user entered a value
            // Convert the first letter of the food item to uppercase and the rest to lowercase
            foodItem = foodItem.charAt(0).toUpperCase() + foodItem.slice(1).toLowerCase();
            
            // Create a new list item element
            let listItem = $("<li>").text(foodItem);
            // Append the new list item to the food list
            $("#foodList").append(listItem);

            // Use Unsplash API to fetch a random food image
            fetch(`https://api.unsplash.com/photos/random?query=${foodItem}&client_id=KjJFUSAH8uohBhnZbdjfHVR8CPKDw1HCItFDETb7nyA`)
            .then(response => response.json())
            .then(data => {
                // Save the new image URL to the imageUrl array
                imageUrl.push(data.urls.regular); 

                // Create a new image element
                let image = $("<img>").attr("src", data.urls.regular)
                                      .attr("alt", foodItem)
                                      .attr("width", 900)
                                      .attr("height", 600);
                // Empty the foodImage div and append the new image
                $("#foodImage").empty().append(image);
                $("#foodName").text("Add food successfully");

            })
            .catch(error => console.log(error));
        }
    });
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


