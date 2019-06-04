//creates an array of television shows as my topic
let tvShows = ["The Eric Andre Show", "I Think You Should Leave", "Nathan for You", "Game of Thrones", "Here and Now", "Pen15"];

//function to display shows from the array as buttons
function renderButtons(){
    //this empties out the div with id dump-buttons everytime this function is called. that way, the whole array isn't re-made into buttons, resulting in duplicate buttons. 
    $("#dump-buttons").empty();
    //we're going to make a for-loop so that we can go through the array of shows and turn them into buttons everytime the array is updated with new shows.
    for (var i = 0; i < tvShows.length; i++){
        //this sets the creation of a new button to the variable newButton
        let newButton = $("<button>");
        //this gives the class tv-button to the button we are generating
        newButton.addClass("tv-button");
        //in addition to a class, we are giving the button a data attribute called data-name with the value of data-name being the name of the tv show(i.e. the index of the array).THIS IS STILL META-DATA AND ISN'T SHOWN IN THE DOM 
        newButton.attr("data-name", tvShows[i]);
        //this gives the new button text, which could be anything, but here it is the value of the string in the array tvShows
        newButton.text(tvShows[i]);
        //this directs the button(s) back to the div we previously emptied
        $("#dump-buttons").append(newButton);
    }
};
console.log(tvShows);

//function to make the Add Show button work
$("#add-tv").on("click", function(event){
    event.preventDefault();
    //pull the text input by the user
    let input = $("#tv-input").val().trim();
    //then, we'll add it into our array of television shows
    tvShows.push(input);
    //now that our array is updated, we'll call the function renderButtons so that we can empty the old array and show our new array
    renderButtons();
})

renderButtons();