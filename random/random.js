var devilFruits = [];

$.getJSON("../assets/fruits.json", function(json) {
    for(var i = 0; i < json.length; i++) {
    	devilFruits.push(json[i]);
	}
});

var currentDevilFruit = null;

document.addEventListener("languageUpdateEvent", (event) => {
  if (currentDevilFruit != null) {
    loadName();
  }
});

document.addEventListener("spoilerUpdateEvent", (event) => {
    document.getElementById("filter-source-spoiler").checked = getCookie("showSpoilers") == "true";
});

document.addEventListener("canonUpdateEvent", (event) => {
  if (currentDevilFruit != null) {
    loadImage();
  }
});

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function getFilteredList(exclusionList) {
    var filteredDevilFruits = [];

    var parameciaFilter = document.getElementById("filter-type-paramecia").checked;
    var zoanFilter = document.getElementById("filter-type-zoan").checked;
    var logiaFilter = document.getElementById("filter-type-logia").checked;

    var canonFilter = document.getElementById("filter-source-canon").checked;
    var spoilerFilter = document.getElementById("filter-source-spoiler").checked;

    devilFruits.forEach((fruit) => {
        if (fruit.type == "Paramecia" && !parameciaFilter) {
            return;
        } else if (fruit.type == "Zoan" && !zoanFilter) {
            return;
        } else if (fruit.type == "Logia" && !logiaFilter) {
            return;
        } else if (!fruit.canon && canonFilter) {
            return;
        } else if (fruit.spoiler && !spoilerFilter) {
          return;
        }

        for (var i = 0; i < exclusionList.length; i++) {
            if (fruit.name == exclusionList[i]) {
                return;
            }
        }

        filteredDevilFruits.push(fruit);
    });

    return filteredDevilFruits;
}

function randomDevilFruit() {
    var filteredDevilFruits = getFilteredList([document.getElementById("devil-fruit-name").innerHTML]);
    var randomDevilFruit = getRandomInt(filteredDevilFruits.length);

    currentDevilFruit = filteredDevilFruits[randomDevilFruit];

    loadImage();
    loadName();

    var type = filteredDevilFruits[randomDevilFruit].subtype == "" ?
        filteredDevilFruits[randomDevilFruit].type : filteredDevilFruits[randomDevilFruit].subtype;

    document.getElementById("devil-fruit-type").innerHTML = type;
    document.getElementById("devil-fruit-desc").innerHTML = filteredDevilFruits[randomDevilFruit].description;

    document.getElementById("devil-fruit-card").style.display = "flex";
}

function loadName() {
    document.getElementById("devil-fruit-name").innerHTML = getCookie("language") != "english" ? currentDevilFruit.name : currentDevilFruit.english_name;
}

function loadImage() {
    if (currentDevilFruit.canon_image || getCookie("showOnlyCanon") != "true") {
        document.getElementById("devil-fruit-img").src = "../assets/images/fruits/" + currentDevilFruit.image.toLowerCase();
    } else {
        document.getElementById("devil-fruit-img").src = "../assets/images/fruits/invalid.png";
    }
}

function openWiki() {
    var url = currentDevilFruit.wiki_override != "" ? currentDevilFruit.wiki_override : "https://onepiece.fandom.com/wiki/" + currentDevilFruit.name.replace(" ", "_");
    window.open(url, '_blank').focus();
}