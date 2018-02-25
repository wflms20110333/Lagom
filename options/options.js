/*
 * This file is part of Lagom <https://www.aboutlagom.com/>,
 * Copyright (C) 2018-present N. Shaw, S. Suhail, A. Wang, E. Zou
 */

window.addEventListener('load', function(evt) {
    document.getElementById('setTimer').addEventListener('submit', setTimer);
    document.getElementById('blacklistForm').addEventListener('submit', blacklist);
    document.getElementById('whitelistForm').addEventListener('submit', whitelist);
    chrome.runtime.sendMessage({greeting: "helpme"}, function(response) {
        document.getElementById('listurls').innerHTML = makeUL(response.help);
    });
    chrome.runtime.sendMessage({greeting: "checkIfSet"}, function(response) {
        if (response.set) {
            chrome.runtime.sendMessage({greeting: "mytimer"}, function(response) {
                var str = "<ul>";
                str += "<li>Focus length: " + response.one + " minutes</li>";
                str += "<li>Break length: " + response.two + " minutes</li>";
                str += "<li>Length before Unplug: " + response.three + " minutes</li>";
                str += "<li>Unplug length: " + response.four + " minutes</li>";
                str += "</ul>"
                document.getElementById('timersettings').innerHTML = str;
            });
        }
    });
});

function setTimer() {
    var minutes1 = parseInt(document.getElementById('minutes1').value, 10);
    var minutes2 = parseInt(document.getElementById('minutes2').value, 10);
    var minutes3 = parseInt(document.getElementById('minutes3').value, 10);
    var minutes4 = parseInt(document.getElementById('minutes4').value, 10);
    // if decimal, casts down
    if (isNaN(minutes1) || minutes1 <= 0 || isNaN(minutes2) || minutes2 <= 0 || isNaN(minutes3) || minutes3 <= 0 || isNaN(minutes4) || minutes4 <= 0)
        alert("Please enter values greater than 0!");
    else {
        chrome.runtime.sendMessage({greeting: "herestheinput", input1: minutes1, input2: minutes2, input3: minutes3, input4: minutes4}, function(response) {});
        var str = "<ul>";
        str += "<li>Focus length: " + minutes1 + " minutes</li>";
        str += "<li>Break length: " + minutes2 + " minutes</li>";
        str += "<li>Length before Unplug: " + minutes3 + " minutes</li>";
        str += "<li>Unplug length: " + minutes4 + " minutes</li>";
        str += "</ul>"
        document.getElementById('timersettings').innerHTML = str;
    }
}

function blacklist(){
    var burl = document.getElementById('burl').value;
    document.getElementById('burl').value = "";
    chrome.runtime.sendMessage({greeting: "blacklistinput", input4: burl}, function(response) {});
    chrome.runtime.sendMessage({greeting: "helpme"}, function(response) {
        document.getElementById('listurls').innerHTML = makeUL(response.help);
    });
}

function whitelist(){
    var wurl = document.getElementById('wurl').value;
    document.getElementById('wurl').value = "";
    chrome.runtime.sendMessage({greeting: "whitelistinput", input3: wurl}, function(response) {});
    chrome.runtime.sendMessage({greeting: "helpme"}, function(response) {
        document.getElementById('listurls').innerHTML = makeUL(response.help);
    });
}

function makeUL(array) {
    var str = "<ul>";
    for(var i = 0; i < array.length; i++) {
        str += "<li>";
        str += array[i];
        str += "</li>";
    }
    str += "</ul>"
    return str;
}
