var time1 = 1000000000;
var time2 = 1000000000;

var delp = false;

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.greeting == "hello")
            sendResponse({farewell: "goodbye", direct: delp});
        else if (request.greeting == "herestheinput") {
            time1 = request.input1 * 1000; // change this to minutes!!
            time2 = request.input2 * 1000; // change this to minutes!!
            setTimeout(directMode, time1);

            chrome.tabs.query({windowType:'normal'}, function(tabs) {
                for(var i = 0; i < tabs.length; i++) {
                    chrome.tabs.update(tabs[i].id, {url: tabs[i].url});
                }
            });
        }
    }
);

function directMode() {
    delp = true;
    setTimeout(notDirectMode, time2);
}

function notDirectMode() {
    delp = false;
    setTimeout(directMode, time1);
}
