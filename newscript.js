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

var tiers = [
    "S",
    "A",
    "B",
    "C",
    "D",
    "E"
    ];

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

function ceil(n, c){
    if(n > c){
        return c;
    }
    return n;
}
function pow(num){
    return num * num;
}

function generateColors(){
    var t = document.body.getElementsByClassName("tier");
    for(var i = 0; i < t.length; i++){
        var r = t.length / 3;
        var g = t.length / 3 + 3;
        var b = t.length / 3 + 6;
        r = pow((i+1)/r);
        g = pow((i+1)/g);
        b = pow((i+1)/b);
        r = ceil(r*255, 255);
        g = ceil(g*200, 255);
        b = ceil(b*100, 255);
        t[i].style.backgroundColor = "rgba("+r+", "+g+", "+b+", 0.9)";
    }
}

function initTiers(){
    var ts = document.getElementById("tiers");
    for(var i = 0; i < tiers.length; i++){
        ts.innerHTML = ts.innerHTML + '<ul id="'+tiers[i][0]+'" class="tier"><li class="tier-header"><h3 contenteditable="true">'+tiers[i][0]+'</h3></li></ul>';
    }
}


$(document).ready(function(){
    populateCharacters();
    initTiers();
    generateColors();
    $('.character').draggable({
        connectToSortable: 'ul',
        revert: 'invalid',
        scroll: false
    });
    $('#character-area, .tier').sortable({
        items: ".character",
        placeholder: "placeholder",
    });
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
    $(".tier li h3").on("keydown", function(event, ui){
        var key = event.keyCode || event.charCode;
        if(key == 13){
            $(this).blur();
        }
    });
});
$(window).on("load", function(){
    $("#character-area").slideToggle(500);
});