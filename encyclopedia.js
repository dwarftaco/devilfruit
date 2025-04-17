var devilFruits = [];

$.getJSON("assets/fruits.json", function(json) {
    for(var i = 0; i < json.length; i++) {
    	devilFruits.push(json[i]);
	}

    loadFruits();
});

function getRandomDefault(str) {
    var sum = 0;
    for (let i = 0; i < str.length; i++) {
        sum += str.charCodeAt(i);
    }

    return "assets/images/unknown_" + (sum % 4).toString() + ".svg";
}

function loadFruits() {
	$("#encyclopedia").empty();

	var counter = 0;
	$.each(devilFruits, function(i,f) {
		var valid = true;
		
		// outputs the card if it is valid
        if (valid) {
			var card = '<div class="card" id="fruit-' + i + '">' + '<img src="assets/images/fruits/' + f.image
			.toLowerCase()
			    + '" onerror="this.src=' + "'" + getRandomDefault(f.name) + "'" + ';" alt="' + f.title + '">'
			card += '<h1 class="name">' + f.name + '</h1>';

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
			counter += 1;
		}
    });
	
	document.getElementById("total-fruits").innerHTML = "Showing " + counter + " fruits";
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

    var canonFilter = document.getElementById("filter-canon-canon").checked;
    var nonCanonFilter = document.getElementById("filter-canon-noncanon").checked;

    devilFruits.forEach((fruit) => {
        if (fruit.type == "Paramecia" && !parameciaFilter) {
            return;
        } else if (fruit.type == "Zoan" && !zoanFilter) {
            return;
        } else if (fruit.type == "Logia" && !logiaFilter) {
            return;
        } else if (fruit.canon  && !canonFilter) {
            return;
        } else if (!fruit.canon  && !nonCanonFilter) {
            return;
        }

        filteredDevilFruits.push(fruit);
    });

    return filteredDevilFruits;
}