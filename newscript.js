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

var cookieChars = [];

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

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*1000*60*60*24));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function getCharacterCookie(){
    var s = getCookie("tiers");
    if(s == ""){
        return;
    }
    var t = document.body.getElementsByClassName("tier");
    var sp = s.split(",");
    for(var i = 0; i < sp.length; i++){
        var c = sp[i].split(":")[1];
        var chars = c.split("|");
        if(c == ""){
            continue;
        }
        if(i >= t.length){
            addTier();
            generateColors();
        }
        for(var j = 0; j < chars.length; j++){
            cookieChars.push(chars[j]);
            t[i].innerHTML += '<li class="character ui-draggable ui-draggable-handle ui-sortable-handle"><img src="icons/' + chars[j] + '-small.png"><p>' + chars[j] + '</p></li>';
        }
    }
    $("#character-area .character p").each(function(){
        if(cookieChars.indexOf($(this).text()) != -1){
            $(this).parent().remove();
        }
    });
}

function setCharacterCookie(){
    var t = $(".tier");
    var h = document.body.getElementsByClassName("tier-head");
    var s = "";
    for(var i = 0; i < t.length; i++){
        s += h[i].childNodes[0].innerHTML + ":";
        var tag = "#" + tiers[i] + " .character";
        var c = $(tag);
        for(var j = 0; j < c.length; j++){
            s += c[j].childNodes[1].innerHTML;
            if(j < c.length - 1){
                s += "|";
            }
        }
        if(i < t.length - 1){
            s += ",";
        }
    }
    setCookie("tiers", s, 7);
}

function setHeaderCookie(){
    var s = "";
    var h = document.body.getElementsByClassName("tier-head");
    for(var i = 0; i < h.length; i++){
        s += h[i].childNodes[0].innerHTML;
        if(i < h.length - 1){
            s += "|";
        }
    }
    setCookie("headers", s, 7);
}
function getHeaderCookie(){
    var s = getCookie("headers");
    if(s == ""){
        return;
    }
    s = s.split("|");
    var t = document.body.getElementsByClassName("tier-head");
    for(var i = 0; i < t.length; i++){
        t[i].childNodes[0].innerHTML = s[i];
    }
}

function setThemeCookie(){
    var t = document.getElementById("theme");
    if(t.innerHTML == "Dark Theme"){
        setCookie("theme", "light", 7);
    }
    else{
        setCookie("theme", "dark", 7);
    }
}

function getThemeCookie(){
    var t = getCookie("theme");
    var b = document.getElementById("theme");
    if(t == "dark"){
        $("body, #header, .button, #character-area, #footer").addClass("dark");
        b.innerHTML = "Light Theme";
    }
    else{

    }
}

function loadPage(){
    populateCharacters();
    initTiers();
    generateColors();
}

function getCookies(){
    getCharacterCookie();
    getHeaderCookie();
    getThemeCookie();
}


$(document).ready(function(){
    $.when(loadPage()).then(getCookies());
    $('.character').draggable({
        connectToSortable: 'ul',
        revert: 'invalid',
        scroll: false,
        stack: ".character"
    });
    $('#character-area, .tier').sortable({
        items: ".character",
        placeholder: "placeholder"
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
    $("#theme").click(function(){
        if($(this).text() === "Dark Theme"){
            $(this).text("Light Theme");
            $("body, #header, .button, #character-area, #footer").addClass("dark");
        }
        else{
            $(this).text("Dark Theme");
            $("body, #header, .button, #character-area, #footer").removeClass("dark");
        }
    });
    $(".tier-head h3").on("keydown", function(event, ui){
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
        if($("body").hasClass("dark")){
            $("#tiers").css("background", "linear-gradient(#000000, #660000)");
        }
        html2canvas(document.querySelector("#tiers")).then(canvas => {
            d.appendChild(canvas)
        });
    });
    $("#canvas-area").click(function(event){
        if (event.target !== this)
            return;
        $("canvas").remove();
        if($("body").hasClass("dark")){
            $("#tiers").css("background", "transparent");
        }
        $("#canvas-area").slideToggle(200);
    });
    $("#reset").click(function(){
        $(".tier .character").remove();
        populateCharacters();
        $('.character').draggable({
            connectToSortable: 'ul',
            revert: 'invalid',
            scroll: false,
            stack: ".character"
        });
        var t = document.body.getElementsByClassName("tier-head");
        for(var i = 0; i < tiers.length; i++){
            t[i].childNodes[0].innerHTML = tiers[i];
        }
    });
});
$(window).on("load", function(){
    $("#character-area").slideToggle(500);
    $('.character').draggable({
            connectToSortable: 'ul',
            revert: 'invalid',
            scroll: false,
            stack: ".character"
    });
});
$(window).on("beforeunload", function(){
    setCharacterCookie();
    setHeaderCookie();
    setThemeCookie();
});