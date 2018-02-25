window.addEventListener('load', function(evt) {
    document.getElementById('setTimer').addEventListener('submit', setTimer);
    document.getElementById('blacklistForm').addEventListener('submit', blacklist);
    document.getElementById('whitelistForm').addEventListener('submit', whitelist);
    // Add the contents of options[0] to #foo:
    chrome.runtime.sendMessage({greeting: "helpme"}, function(response) {
        document.getElementById('listurls').appendChild(makeUL(response.urls));
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
    else
        chrome.runtime.sendMessage({greeting: "herestheinput", input1: minutes1, input2: minutes2, input3: minutes3, input4: minutes4}, function(response) {});
}

function blacklist(){
    var burl = document.getElementById('burl').value;
    document.getElementById('burl').value = "";
    chrome.runtime.sendMessage({greeting: "blacklistinput", input4: burl}, function(response) {});
}

function whitelist(){
    var wurl = document.getElementById('wurl').value;
    document.getElementById('wurl').value = "";
    chrome.runtime.sendMessage({greeting: "whitelistinput", input3: wurl}, function(response) {});

function makeUL(array) {
    // Create the list element:
    var list = document.createElement('ul');

    for(var i = 0; i < array.length; i++) {
        // Create the list item:
        var item = document.createElement('li');

        // Set its contents:
        item.appendChild(document.createTextNode(array[i]));

        // Add it to the list:
        list.appendChild(item);
    }

    // Finally, return the constructed list:
    return list;
}
