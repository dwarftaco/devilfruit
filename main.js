document.addEventListener("click", (event) => {
  var settings = document.getElementById("settings");
  var settingsButton = document.getElementById("toggle-settings");
  if (settings.style.display === "flex" && !settings.contains(event.target) && !settingsButton.contains(event.target)) {
    settings.style.display = "none";
  }
});

const languageUpdateEvent = new Event("languageUpdateEvent");
const spoilerUpdateEvent = new Event("spoilerUpdateEvent");
const canonUpdateEvent = new Event("canonUpdateEvent");

function toggleSettings() {
    var settings = document.getElementById("settings");

    if (settings.style.display != "flex") {
        loadSettings();
        settings.style.display = "flex";
    } else {
        settings.style.display = "none";
    }
}

function loadSettings() {
    var languagePreference = getCookie("language");
    var japaneseButton = document.getElementById("settings-language-japanese");
    var englishButton = document.getElementById("settings-language-english");

    if (languagePreference != "english") {
        englishButton.classList.remove("selected");
        japaneseButton.classList.add("selected");
    } else {
        japaneseButton.classList.remove("selected");
        englishButton.classList.add("selected");
    }

    document.getElementById("settings-spoilers").checked = getCookie("showSpoilers") == "true"
    document.getElementById("settings-canon").checked = getCookie("showOnlyCanon") == "true"

}

function saveLanguageSetting(language) {
    setCookie("language", language, 365);

    var japaneseButton = document.getElementById("settings-language-japanese");
    var englishButton = document.getElementById("settings-language-english");

    if (language == "japanese") {
        englishButton.classList.remove("selected");
        japaneseButton.classList.add("selected");
    } else {
        japaneseButton.classList.remove("selected");
        englishButton.classList.add("selected");
    }

    document.dispatchEvent(languageUpdateEvent);
}

function saveSpoilerSetting() {
    setCookie("showSpoilers", document.getElementById("settings-spoilers").checked, 365);
    document.dispatchEvent(spoilerUpdateEvent);
}

function saveCanonSetting() {
    setCookie("showOnlyCanon", document.getElementById("settings-canon").checked, 365);
    document.dispatchEvent(canonUpdateEvent);
}

function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  let expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}