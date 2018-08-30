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
    "C"
    ];

function populateCharacters(){
    var s = "";
    var area = document.getElementById("character-area");
    for(var i = 0; i < characters.length; i++){
        var char = characters[i];
        char = char.replace(/\s+/g, '-').toLowerCase();
        s = s + "<li class='character'><img src='icons/"+characters[i]+"-small.png'/><p>"+characters[i]+"</p></li>";
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
    var t = document.body.getElementsByClassName("tier-box");
    var h = document.body.getElementsByClassName("tier-head");
    for(var i = 0; i < t.length; i++){
        var r = t.length / 3;
        var g = t.length / 3 + 3;
        var b = t.length / 3 + 6;
        r = pow((i+1)/r);
        g = pow((i+1)/g);
        b = pow((i+1)/b);
        r = Math.round(ceil(r*255, 255));
        g = Math.round(ceil(g*200, 255));
        b = Math.round(ceil(b*100, 255));
        if(r+g+b > 700){
            r = 255;
            g = 255;
            b = 175;
        }
        alert(r + " " + g + " " + b);
        t[i].style.backgroundColor = "rgba("+r+", "+g+", "+b+", 0.9)";
        h[i].style.backgroundColor = "rgba("+r+", "+g+", "+b+", 0.9)";
    }
}

function initTiers(){
    var ts = document.getElementById("tiers");
    for(var i = 0; i < tiers.length; i++){
        ts.innerHTML = ts.innerHTML + '<div class="tier-box"><div class="tier-head"><h3 contenteditable="true">'+tiers[i]+'</h3></div><ul id="'+tiers[i]+'" class="tier"></ul></div>';
    }
}

function addTier(){
    var ts = document.getElementById("tiers");
    var l;
    if(tiers.length == 0){
        l = "S";
    }
    else if(tiers[tiers.length-1] == "S"){
        l = "A";
    }
    else{
        l = String.fromCharCode(tiers[tiers.length-1].charCodeAt() + 1);
    }
    ts.innerHTML = ts.innerHTML + '<div class="tier-box"><div class="tier-head"><h3 contenteditable="true">'+l+'</h3></div><ul id="'+l+'" class="tier"></ul></div>';
    tiers.push(l);
}

function removeTier(){
    var t = document.body.getElementsByClassName("tier");
    t = t[t.length-1];
    var c = t.getElementsByClassName("character");
    for(var i = 0; i < c.length; ){
        c[i].style.height = "3.5rem";
        c[i].style.width = "unset";
        $("#character-area").append(c[i]);
    }
    $(".tier-box:last-child").remove();
    tiers.pop();
}

function downloadCanvas(){
    var d = document.getElementById("download-button");
    var canvas = document.getElementById("canvas-area").childNodes[3];
    var image = canvas.toDataURL("image/jpg").replace("image/png", "image/octet-stream");
	d.setAttribute("href", image);
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
    $("#about").click(function(){
        $("#about-section").slideToggle(200);
    });
    $("#options").click(function(){
        $(".option-buttons").slideToggle(200);
    });
    $("#add-text").click(function(){
        if($(this).text() === "Add Text"){
            $(".character p").slideDown(200);
            $(this).text("Remove Text");
        }
        else{
            $(".character p").slideUp(200);
            $(this).text("Add Text");
        }
    });
    $("#add-tier").click(function(){
        addTier();
        generateColors();
        $('#character-area, .tier').sortable({
            items: ".character",
            placeholder: "placeholder",
        });
    });
    $("#remove-tier").click(function(){
        removeTier();
        generateColors();
    });
    $(".tier li h3").on("keydown", function(event, ui){
        var key = event.keyCode || event.charCode;
        if(key == 13){
            $(this).blur();
        }
    });
    $(document).click(function(event){
        if ($(event.target).is('#about-section, #about-section *') || $("#about-section").css("display") == "none" || $(event.target).is("#about")) {
            return;
        }
        else
        {
            $("#about-section").slideToggle(200);
        }
    });
    $("#about-close").click(function(){
        $("#about-section").slideToggle(200);
    });
    $("#save-list").click(function(){
        var d = document.getElementById("canvas-area");
        $("#canvas-area").slideToggle(200);
        html2canvas(document.querySelector("#tiers")).then(canvas => {
            d.appendChild(canvas)
        });
    });
    $("#canvas-area").click(function(event){
        if (event.target !== this)
            return;
        $("canvas").remove();
        $("#canvas-area").slideToggle(200);
    });
    $("#reset").click(function(){
        $(".tier .character").remove();
        populateCharacters();
        $('.character').draggable({
            connectToSortable: 'ul',
            revert: 'invalid',
            scroll: false
        });
    });
});
$(window).on("load", function(){
    $("#character-area").slideToggle(500);
});