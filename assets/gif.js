//creates an array of television shows as my topic
var tvShows = ["The Eric Andre Show", "Documentary Now", "Nathan for You", "Pen15"];

//function to display shows from the array as buttons
function renderButtons() {
    //this empties out the div with id dump-buttons everytime this function is called. that way, the whole array isn't re-made into buttons, resulting in duplicate buttons. 
    $("#dump-buttons").empty();
    //we're going to make a for-loop so that we can go through the array of shows and turn them into buttons everytime the array is updated with new shows.
    for (var i = 0; i < tvShows.length; i++) {
        //this sets the creation of a new button to the variable newButton
        var newButton = $("<button>");
        //this gives the class tv-button to the button we are generating
        newButton.addClass("tv-button");
        //in addition to a class, we are giving the button a data attribute called data-name with the value of data-name being the name of the tv show(i.e. the index of the array).THIS IS STILL META-DATA AND ISN'T SHOWN IN THE DOM 
        newButton.attr("data-name", tvShows[i]);
        console.log(tvShows[i]);
        //this gives the new button text, which could be anything, but here it is the value of the string in the array tvShows
        newButton.text(tvShows[i]);
        //this directs the button(s) back to the div we previously emptied
        $("#dump-buttons").append(newButton);
    } 
}
renderButtons();

//function to make the Add Show button work
$("#add-tv").on("click", function(event){
    event.preventDefault();
    //pull the text input by the user
    let input = $("#tv-input").val().trim();
    //then, we'll add it into our array of television shows
    tvShows.push(input);
    //now that our array is updated, we'll call the function renderButtons so that we can empty the old array and show our new array
    renderButtons();
    //empties input text when you click inside again
    $("input:text").focus(
        function(){
            $(this).val('');
        });
})

//function to make buttons display gifs 
function generate() {
    //create a click event 
    $("button").on("click", function (event){
        event.preventDefault();
        //empties out the previous button's gifs
        $("#gif-dump").empty();
        //this will grab the value of data attribute "data-name" and store it in the variable "show"
        var show =  $(this).attr("data-name");
        //this makes a query url that inserts the value in order to get a specific gif to eventually display. (q sets the topic and limit sets the limit on results to display)
        var queryUrl = "https://api.giphy.com/v1/gifs/search?q=" + show + "&api_key=9hiva0MxBroQdI1A23eUS7o6xT2Inyty&limit=10";
        //make an AJAX request
        $.ajax({
            url: queryUrl,
            method: "GET"
        })
            //then we construct a "promise" to return data after request has been completed
            .then(function(response) {
                //logging the response so we can look through the returned object and find what information we want to display
                console.log(response);
                //saving the data of the object to a variable purely so that we don't have to use dot notation every time we want to call upon this section of the object
                var results = response.data;
                //creating a loop to return several gifs from the object
                for (var i = 0; i < results.length; i++) {
                    //dynamically creating a div and storing it in a variable 
                    var tvShowDiv = $("<div>");
                    //dynamically creating a p tag so we can display the gif's rawting
                    var rating = $("<p>").text("Rating: " + results[i].rating);
                    //dynamically creating an image tag to append the gif to
                    var tvShowImage = $("<img>");
                    //give each image a class of "gif"
                    tvShowImage.attr("class", "gif");
                    //giving the image tag a src attribute and the actual source (traverse the object in the console to find the image location)
                    tvShowImage.attr("src", results[i].images.fixed_height_still.url);
                    //giving a data attribute "still" and assigning the still image to it
                    tvShowImage.attr("data-still", results[i].images.fixed_height_still.url);
                    //giving a data attribute "animate" and assigning the moving gif to it
                    tvShowImage.attr("data-animate",results[i].images.fixed_height.url)
                    //giving a data attribute to determine the state of the gif (still or animated)
                    tvShowImage.attr("data-state", "still")
                    //now that we've created elements dynamically and given them their attributes, we will append them to the div we created
                    tvShowDiv.append(rating);
                    tvShowDiv.append(tvShowImage);
                    //now, to show in the DOM, we prepend the div to the id we hard coded in our html file
                    $("#gif-dump").prepend(tvShowDiv);
            
                }
            })
    
    })
}


//make gifs pause and start when clicked
$(document).on("click", ".gif", function(){
    //detects the state of gifs by isolating the data attribute and storing it to variable "state"
    var state = $(this).attr("data-state");
    //set up conditionals for instructions on what to do for each state
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
});

//adding a listener to run function generate whenever something is clicked upon
$(document).on("click", generate);


