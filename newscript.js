var characters = [
    "Bayonetta",
    "Bowser",
    "Bowser Jr.",
    "Captain Falcon",
    "Chrom",
    "Cloud",
    "Corrin",
    "Daisy",
    "Dark Pit",
    "Dark Samus",
    "Diddy Kong",
    "Donkey Kong",
    "Dr. Mario",
    "Duck Hunt",
    "Falco",
    "Fox",
    "Ganondorf",
    "Greninja",
    "Ice Climbers",
    "Ike",
    "Inkling",
    "Jigglypuff",
    "King Dedede",
    "King K. Rool",
    "Kirby",
    "Link",
    "Little Mac",
    "Lucario",
    "Lucas",
    "Lucina",
    "Luigi",
    "Mario",
    "Marth",
    "Mega Man",
    "Meta Knight",
    "Mewtwo",
    "Mii Fighter",
    "Mr. Game and Watch",
    "Ness",
    "Olimar",
    "Pac-Man",
    "Palutena",
    "Peach",
    "Pichu",
    "Pikachu",
    "Pit",
    "Pokemon Trainer",
    "R.O.B.",
    "Richter",
    "Ridley",
    "Robin",
    "Rosalina and Luma",
    "Roy",
    "Ryu",
    "Samus",
    "Sheik",
    "Shulk",
    "Simon",
    "Snake",
    "Sonic",
    "Toon Link",
    "Villager",
    "Wario",
    "Wii Fit Trainer",
    "Wolf",
    "Yoshi",
    "Young Link",
    "Zelda",
    "Zero Suit Samus"];

function populateCharacters(){
    var s = "";
    var area = document.getElementById("character-area");
    for(var i = 0; i < characters.length; i++){
        var char = characters[i];
        char = char.replace(/\s+/g, '-').toLowerCase();
        s = s + "<li class='character'><img src='icons/"+characters[i]+"-small.png' /><p>"+characters[i]+"</p></li>";
    }
    area.innerHTML = s;
}


$(document).ready(function(){
    populateCharacters();
    $('.character').draggable({
        connectToSortable: 'ul',
        revert: 'invalid',
        scroll: false
    });
    $('#character-area, .tier').sortable({
        items: ".character",
        placeholder: "placeholder",
        //revert: true
    });
    //$( "ul, li, p" ).disableSelection();
    $("#options").click(function(){
        if($(this).text() === "Add Text"){
            $(".character p").slideDown(200);
            $(this).text("Remove Text");
        }
        else{
            $(".character p").slideUp(200);
            $(this).text("Add Text");
        }
    });
    $(".tier li h3").on("keydown",function(e){
        var key = e.keyCode || e.charCode;  // ie||others
        if(key == 13)  // if enter key is pressed
            $(this).blur();  // lose focus
    });
});
$(window).on("load", function(){
    $("#character-area").slideToggle(500);
});