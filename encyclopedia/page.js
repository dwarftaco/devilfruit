var devilFruits = [];

document.addEventListener("languageUpdateEvent", (event) => {
    loadName();
});

document.addEventListener("DOMContentLoaded", (event) => {
  loadName();
});

function loadName() {
    var japaneseName = document.getElementById("devil-fruit-name");
    var englishName = document.getElementById("devil-fruit-name-english");
    if (getCookie("language") == "japanese") {
        japaneseName.style.display = "block";
        englishName.style.display = "none";
    } else {
        japaneseName.style.display = "none";
        englishName.style.display = "block";
    }
}

function openInNewTab(url) {
  window.open(url, '_blank').focus();
}