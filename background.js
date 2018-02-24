var timeLeft1 = 5000;
var timeLeft2 = 3000;
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.greeting == "hello")
            sendResponse({farewell: "goodbye", time1: timeLeft1, time2: timeLeft2});
        else if (request.greeting == "herestheinput") {
            timeLeft1 = request.input1 * 1000;
            timeLeft2 = request.input2 * 1000;
            //alert(timeLeft);
        }
    }
);
