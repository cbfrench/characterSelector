var characters = [
    "Bayonetta",
    "Bowser",
    "Bowser Jr.",
    "Captain Falcon",
    "Charizard",
    "Cloud",
    "Corrin",
    "Dark Pit",
    "Diddy Kong",
    "Donkey Kong",
    "Dr. Mario",
    "Duck Hunt",
    "Falco",
    "Fox",
    "Ganondorf",
    "Greninja",
    "Ike",
    "Jigglypuff",
    "King Dedede",
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
    "Mii Brawler",
    "Mii Gunner",
    "Mii Swordfighter",
    "Mr. Game & Watch",
    "Ness",
    "Olimar",
    "Pac-Man",
    "Palutena",
    "Peach",
    "Pikachu",
    "Pit",
    "ROB",
    "Robin",
    "Rosalina & Luma",
    "Roy",
    "Ryu",
    "Samus",
    "Sheik",
    "Shulk",
    "Sonic",
    "Toon Link",
    "Villager",
    "Wario",
    "Wii Fit Trainer",
    "Yoshi",
    "Zelda",
    "Zero Suit Samus"];

var ids = ["best1", "best2", "best3", "best4", "best5", "enjoy1", "enjoy2", "enjoy3", "enjoy4", "enjoy5", "tier1", "tier2", "tier3", "tier4", "tier5"];

var best1;
var best2;
var best3;
var best4;
var best5;
var enjoy1;
var enjoy2;
var enjoy3;
var enjoy4;
var enjoy5;
var tier1;
var tier2;
var tier3;
var tier4;
var tier5;
var spaces = [best1, best2, best3, best4, best5, enjoy1, enjoy2, enjoy3, enjoy4, enjoy5, tier1, tier2, tier3, tier4, tier5];
var best = [], enjoy = [], tier = [], results = [], board = [];


function loadPage(){
    characterList();
}


function menu(){
    window.location.href = "menu.html";
}


//Will need PHP to do the board functions
function saveBoard(){
    sessionStorage.board = board;
}


function getBoard(){
    board = sessionStorage.board;
}



function searchArray(array, term){ 
    var i;
    for(i = 0; i < array.length; i++){
        if(term == array[i]){
            return i;
        }
    }
    return -1;
}


function removeSpaces(results){
    var newResult = [];
    for(var i = 0; i < results.length; i++){
        if(typeof results[i][0] != "undefined"){
            newResult.push(results[i]);
        }
    }
    return newResult;
}


function drag(ev){
    ev.dataTransfer.setData("text", ev.target.id);
}


function dragExisting(ev){
    ev.dataTransfer.setData("text", ev.target.value);
}


/*
NEED to fix error where images that have already been chosen cannot be modified.
*/
function drop(ev){
    ev.preventDefault();
    var dragged = ev.dataTransfer.getData("text");
    dragged = document.getElementById(dragged);
    var parent = ev.currentTarget;
    var oldSpace = dragged.parentNode;
    var swap = null;
    while(parent.firstChild){
        parent.removeChild(parent.firstChild);
    }
    var copy = document.createElement("img");
    var val = dragged.id;
    if(typeof val == "undefined"){
        val = dragged.getAttribute("value");
    }
    copy.setAttribute("src", "characterIcons/" + val + ".png");
    copy.value = val;
    copy.className = "duplicate";
    copy.setAttribute("draggable", true);
    copy.setAttribute("ondragstart", "dragExisting(event)");
    parent.appendChild(copy);
    oldSpace.appendChild(dragged);
}


function deleteItem(ev){
    var el = document.getElementById(ev.dataTransfer.getData("text"));
    el.parentNode.removeChild(el);
}


function allowDrop(ev){
    ev.preventDefault();
}


function consolidate(results){
    var newResult = [];
    for(var i = 0; i < results.length; i++){
        var found = -1;
        for(var j = 0; j < newResult.length; j++){
            if(newResult[j][0] == results[i][0]){
                found = j;
            }
        }
        if(found >= 0){
            newResult[found][1] += results[i][1];
        }
        else{
            newResult.push(results[i]);
        }
    }            
    return newResult;
}


function sortFunction(a, b){
    return b[1]-a[1];
}


function printer(array){
    for(var i = 0; i < array.length; i++){
        window.alert(array[i][0] + ", " + array[i][1]);
    }
}


function mouseOverImage(thing){
    var image = document.getElementById(thing.id);
    image.draggable = true;
}


function mouseExitImage(thing){
    var image = document.getElementById(thing.id);
    image.draggable = false;
}


function checkIfEmpty(results){
    var i;
    for(i = 0; i < 5; i++){
        if(results[i][0] !== ""){
            return 1;
        }
    }
    return 0;
}


function getValues(spaces, ids){
    for(var i = 0; i < spaces.length; i++){
        var current = document.getElementById(ids[i]);
        var list = current.getElementsByTagName("img");
        if(list.length > 0){
            spaces[i] = list[0].value;
        }
    }
}


function resultArray(best, enjoy, tier){
    var result = [];
    for(var i = 0; i < 5; i++){
        result.push([best[i], 7-i]);
        result.push([enjoy[i], 6-i]);
        result.push([tier[i], 5-i]);
    }
    return result;
}


function getResults(){
    document.getElementById("answers").innerHTML = null;
    getValues(spaces, ids);
    for(var i = 0; i < 5; i++){
        best[i] = spaces[i];
        enjoy[i] = spaces[i+5];
        tier[i] = spaces[i+10];
    }
    results = resultArray(best, enjoy, tier);
    board = results;
    results = removeSpaces(results);
    results = consolidate(results);
    results.sort(sortFunction);
    for(var i = 0; i < results.length; i++){
        if(i < 5){
            document.getElementsByTagName("h4")[0].style.visibility = "visible";
            document.getElementById("answers").innerHTML += "<div class=\"resultImage\"><img src=\"characterIcons/" + results[i][0] + ".png\">";
        }
    }
}


function characterList(){
    for(var i = 0; i < characters.length; i++){
        document.getElementById("characters").innerHTML += "<div class=\"selection\"><img src=\"characterIcons/" + characters[i] + ".png\" id=\"" + characters[i] + "\" value=\"" + characters[i] + "\" onmouseenter=\"mouseOverImage(this)\" onmouseleave=\"mouseExitImage(this)\" draggable=\"false\" ondragstart=\"drag(event)\"></div>";
    }
}
