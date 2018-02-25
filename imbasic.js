// POST the data to the server using XMLHttpRequest
function setTimer() {
    // Cancel the form submit
    event.preventDefault();

    var minutes1 = parseInt(document.getElementById('minutes1').value, 10);
    var minutes2 = parseInt(document.getElementById('minutes2').value, 10);
    chrome.runtime.sendMessage({greeting: "herestheinput", input1: minutes1, input2: minutes2}, function(response) {
        // doing nothing woooo
        console.log("setTimeddfdsl");
      }
    );
}

function blacklist(){
    //alert("rip");
    var burl = document.getElementById('burl').value;
    //alert(burl);
    //console.log(burl);
    chrome.runtime.sendMessage({greeting: "blacklistinput", input4: burl}, function(response) {
        //console.log(burl);
        //alert("hi im back");
      }
    );
}

function whitelist(){
    var wurl = document.getElementById('wurl').value;
    console.log(wurl);
    chrome.runtime.sendMessage({greeting: "whitelistinput", input3: wurl}, function(response) {
        // doing nothing woooo
        console.log(wurl);
      }
    );
}

// When the popup HTML has loaded
window.addEventListener('load', function(evt) {
    // Cache a reference to the status display SPAN
    statusDisplay = document.getElementById('status-display');
    // Handle the bookmark form submit event with our addBookmark function
    //document.getElementById('setTimer').addEventListener('submit', setTimer);
    //addListener('setTimer', setTimer);
    //addListener('blacklistForm', blacklist);
    document.getElementById('blacklistForm').addEventListener('submit', blacklist);
    document.getElementById('whitelistForm').addEventListener('submit', whitelist);
    //addListener('whitelistForm', whitelist);
});

function addListener(x, func) {
    document.getElementById(x).addEventListener('submit', func);
}