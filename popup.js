chrome.runtime.sendMessage({greeting: "checkState"}, function(response) {
    if (!response.started)
        document.getElementById("not-in-use").style.display = "block";
    else if (response.on2) {
        document.getElementById("lagom-on").style.display = "block";
        document.getElementById("options").style.display = "none";
    }
    else if (response.on) {
        document.getElementById("focus-on").style.display = "block";
    }
    else
        document.getElementById("lagom-off").style.display = "block";
});

document.getElementById('not-in-use').addEventListener('click', start);
document.getElementById('lagom-off').addEventListener('click', stop);
document.getElementById('options').addEventListener('click', openOptions);

function start() {
    chrome.runtime.sendMessage({greeting: "checkIfSet"}, function(response) {
        if (!response.set) {
            document.getElementById("not-in-use").style.display = "none";
            document.getElementById("lagom-on").style.display = "none";
            document.getElementById("focus-on").style.display = "none";
            document.getElementById("lagom-off").style.display = "none";
            document.getElementById("go-set-options").style.display = "block";
            document.getElementById("options").style.display = "block";
        }
        else {
            document.getElementById("not-in-use").style.display = "none";
            document.getElementById("lagom-on").style.display = "none";
            document.getElementById("focus-on").style.display = "block";
            document.getElementById("lagom-off").style.display = "none";
            document.getElementById("go-set-options").style.display = "none";
            document.getElementById("options").style.display = "block";
            chrome.runtime.sendMessage({greeting: "turnOn"}, function(response) {});
        }
    });
}

function stop() {
    document.getElementById("not-in-use").style.display = "block";
    document.getElementById("lagom-on").style.display = "none";
    document.getElementById("focus-on").style.display = "none";
    document.getElementById("lagom-off").style.display = "none";
    document.getElementById("go-set-options").style.display = "none";
    document.getElementById("options").style.display = "block";
    chrome.runtime.sendMessage({greeting: "turnOff"}, function(response) {});
}

function on() {
    document.getElementById("not-in-use").style.display = "none";
    document.getElementById("lagom-on").style.display = "block";
    document.getElementById("focus-on").style.display = "none";
    document.getElementById("lagom-off").style.display = "none";
    document.getElementById("go-set-options").style.display = "none";
    document.getElementById("options").style.display = "none";
}

function off() {
    document.getElementById("not-in-use").style.display = "none";
    document.getElementById("lagom-on").style.display = "none";
    document.getElementById("focus-on").style.display = "none";
    document.getElementById("lagom-off").style.display = "block";
    document.getElementById("go-set-options").style.display = "none";
    document.getElementById("options").style.display = "block";
}

function focus() {
    document.getElementById("not-in-use").style.display = "none";
    document.getElementById("lagom-on").style.display = "none";
    document.getElementById("focus-on").style.display = "block";
    document.getElementById("lagom-off").style.display = "none";
    document.getElementById("go-set-options").style.display = "none";
    document.getElementById("options").style.display = "block";
}

function openOptions() {
    var win = window.open("../options/options.html", '_blank');
    win.focus();
}

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.greeting == "lagomOn") {
            on();
        }
        else if (request.greeting == "lagomOff") {
            off();
        }
        else if (request.greeting == "focusOn") {
            focus();
        }
    }
);