// POST the data to the server using XMLHttpRequest
function setTimer() {
    // Cancel the form submit
    event.preventDefault();

    var minutes1 = parseInt(document.getElementById('minutes1').value, 10);
    var minutes2 = parseInt(document.getElementById('minutes2').value, 10);

    chrome.runtime.sendMessage({greeting: "herestheinput", input1: minutes1, input2: minutes2}, function(response) {
        // doing nothing woooo
      }
    );
}

// When the popup HTML has loaded
window.addEventListener('load', function(evt) {
    document.getElementById('setTimer').addEventListener('submit', setTimer);
});