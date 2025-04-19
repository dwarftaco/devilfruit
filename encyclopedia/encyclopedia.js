var devilFruits = [];

$.getJSON("../assets/fruits.json", function(json) {
    for(var i = 0; i < json.length; i++) {
    	devilFruits.push(json[i]);
	}

    loadFruits();
});

document.addEventListener("languageUpdateEvent", (event) => {
    loadNames();
});

document.addEventListener("spoilerUpdateEvent", (event) => {
    document.getElementById("filter-source-spoiler").checked = getCookie("showSpoilers") == "true";
    loadFruits();
});

document.addEventListener("canonUpdateEvent", (event) => {
    loadImages();
});


function getRandomDefault(str) {
    var sum = 0;
    for (let i = 0; i < str.length; i++) {
        sum += str.charCodeAt(i);
    }

    return "../assets/images/unknown_" + (sum % 4).toString() + ".svg";
}

function loadFruits() {
	$("#encyclopedia").empty();

	document.getElementById("encyclopedia").style.display = "none";

	var counter = 0;
	$.each(devilFruits, function(i,f) {
		var valid = true;
		
		// outputs the card if it is valid
        if (valid) {
            var name = getCookie("language") != "english" ? f.name : f.english_name;
            var imageName = f.canon_image || getCookie("showOnlyCanon") != "true" ? f.image.toLowerCase() : "invalid.png";
			var card = '<div class="card" id="fruit-' + i + '"><a class="wiki-link"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#777777"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h560v-280h80v280q0 33-23.5 56.5T760-120H200Zm188-212-56-56 372-372H560v-80h280v280h-80v-144L388-332Z"/></svg></a>'
			+ '<div class="img-container"><img id="fruit-' + i + '-img" src="../assets/images/fruits/' + imageName
			+ '" onerror="this.src=' + "'" + getRandomDefault(f.name) + "'" + ';" alt="' + name + '"></div>'
			card += '<h1 class="name" id="fruit-' + i + '-name">' + name + '</h1>';

            var type = f.subtype == "" ? f.type : f.subtype;

            card += '<h2 class="type">' + type + '</h2>';

            var short_description = f.short_description;
            var cutoff = 100;
            if (f.short_description.length > cutoff) {
                short_description = f.short_description.substring(0, cutoff - 3) + "...";
            }

            card += '<p class="desc">' + short_description + '</p>';
            card += '</div>';
			
            $("#encyclopedia").append(card);


            var wikiUrl = f.wiki_override != "" ? f.wiki_override : "https://onepiece.fandom.com/wiki/" + f.name.replaceAll(" ", "_");
            document.getElementById("fruit-" + i).addEventListener("click", function (e) {
                e.preventDefault(); // Prevent default anchor behavior
                openInNewTab(wikiUrl);
            });

			counter += 1;
		}
    });

	filterFruits();

	document.getElementById("encyclopedia").style.display = "flex";
}

function filterFruits() {
    var input, filter;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();

    var filteredList = getFilteredList();

	var counter = 0;
	$.each(devilFruits, function(i,f) {
		var valid = filteredList.includes(f) && (f.name.toUpperCase().indexOf(filter) > -1 || f.english_name
		.toUpperCase()
		.indexOf
		(filter) > -1
            || f.type.toUpperCase().indexOf(filter) > -1 || f.subtype.toUpperCase().indexOf(filter) > -1 ||
            f.short_description.toUpperCase().indexOf(filter) > -1);
		
		// outputs the card if it is valid
        if (valid) {
            document.getElementById("fruit-" + i).style.display = "flex";
            counter += 1;
        } else {
            document.getElementById("fruit-" + i).style.display = "none"
        }
    });
	
	document.getElementById("total-fruits").innerHTML = "Showing " + counter + " fruits";
}

function getFilteredList() {
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

        filteredDevilFruits.push(fruit);
    });

    return filteredDevilFruits;
}

function loadNames() {
    $.each(devilFruits, function(i,f) {
        document.getElementById("fruit-" + i + "-name").innerHTML = getCookie("language") != "english" ? f.name : f.english_name;
    });
}

function loadImages() {
    $.each(devilFruits, function(i,f) {
        if (f.canon_image || getCookie("showOnlyCanon") != "true") {
            document.getElementById("fruit-" + i + "-img").src = "../assets/images/fruits/" + f.image.toLowerCase();
        } else {
            document.getElementById("fruit-" + i + "-img").src = "../assets/images/invalid.png";
        }
    });
}

function openInNewTab(url) {
  window.open(url, '_blank').focus();
}