var timeLeft = 3000;
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.greeting == "hello")
            sendResponse({farewell: "goodbye", time: timeLeft});
        else if (request.greeting == "herestheinput") {
            timeLeft = request.input * 1000;
            alert(timeLeft);
        }
    }
);
