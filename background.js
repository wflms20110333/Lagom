/*
 * This file is part of Lagom <https://www.aboutlagom.com/>,
 * Copyright (C) 2018-present N. Shaw, S. Suhail, A. Wang, E. Zou
 */

var urls = [];   //    *://*.facebook.com/*

function addURL(details){
    urls.push(details);
}

function deleteURL(url){
    var index = urls.indexOf(url);
    if(index > -1)
        urls.splice(index, 1);
}

function format(url) {
    if (url.startsWith("https://"))
        url = url.substring(8);
    if (url.startsWith("http://"))
        url = url.substring(7);
    if (url.startsWith("www."))
        url = url.substring(4);
    return url;
}

function ValidURL(str) {
    var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
        '(\\#[-a-z\\d_]*)?$','i'); // fragment locater
    if(!pattern.test(str)) {
        alert("Please enter a valid URL.");
        return false;
    } 
    else {
        return true;
    }
}



var time1 = 1000000000;
var time2 = 1000000000;
var time3 = 1000000000;
var time4 = 1000000000;

var t1 = setTimeout(notBlacklistMode, time1);
var t2 = setTimeout(blacklistMode, time2);
var t3 = setTimeout(directMode, time3);
var t4 = setTimeout(notDirectMode, time4);

var timesSet = false;

var on = false;
var blacklisting = false;
var directing = false;

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.greeting == "herestheinput") {
            time1 = request.input1 * 1000 * 60; // change this to minutes!!
            time2 = request.input2 * 1000 * 60; // change this to minutes!!
            time3 = request.input3 * 1000 * 60; // change this to minutes!!
            time4 = request.input4 * 1000 * 60; // change this to minutes!!

            timesSet = true;
            on = true;
            directing = false;

            blacklistMode();
            clearTimeout(t3);
            t3 = setTimeout(directMode, time3);
            reloadAllTabs();
        }
        else if (request.greeting == "checkIfSet") {
            sendResponse({set: timesSet});
        }
        else if (request.greeting == "turnOn") {
            on = true;
            directing = false;
            
            blacklistMode();
            clearTimeout(t3);
            t3 = setTimeout(directMode, time3);
        }
        else if (request.greeting == "turnOff") {
            on = false;
            blacklisting = false;
            directing = false;
            clearTimeout(t1);
            clearTimeout(t2);
            clearTimeout(t3);
            clearTimeout(t4);
        }
        else if (request.greeting == "checkState") {
            sendResponse({started: on, on1: blacklisting, on2: directing});
        }
        else if (request.greeting == "blacklistinput") {
        	if (ValidURL(request.input4)) {
                var now = format(request.input4);
                if (urls.indexOf(now) < 0) {
                    addURL(now);
                    reloadAllTabs();
                }
        	}
        }
        else if (request.greeting == "whitelistinput") {
        	if (ValidURL(request.input3)) {
                var now = format(request.input3);
                if (blacklisting && urls.indexOf(now) >= 0)
                    alert("You can't remove a currently blacklisted site while in Focus mode!");
	        	else {
                    deleteURL(now);
                    reloadAllTabs();
                }
        	}
        }
        else if (request.greeting == "checkIfBlocked") {
            var seen = false;
            for (x in urls) {
                if (request.url.includes(urls[x])) {
                    seen = true;
                    break;
                }
            }
            sendResponse({blocked: seen});
        }
        else if (request.greeting == "helpme") {
            sendResponse({help: urls});
        }
        else if (request.greeting == "mytimer") {
            sendResponse({one: time1 / 60000, two: time2 / 60000, three: time3 / 60000, four: time4 / 60000});
        }
    }
);

function blacklistMode() {
    if (!on)
        return;
    blacklisting = true;
    if (!directing) {
        chrome.runtime.sendMessage({greeting: "focusOn"}, function(response) {});
        alert("Focus mode has started.");
    }
    clearTimeout(t1);
    t1 = setTimeout(notBlacklistMode, time1);
}

function notBlacklistMode() {
    if (!on)
        return;
    blacklisting = false;
    if (!directing) {
        chrome.runtime.sendMessage({greeting: "lagomOff"}, function(response) {});
        alert("Break mode has started.");
    }
    clearTimeout(t2);
    t2 = setTimeout(blacklistMode, time2);
}

function directMode() {
    if (!on)
        return;
    directing = true;
    chrome.runtime.sendMessage({greeting: "lagomOn"}, function(response) {});
    clearTimeout(t1);
    clearTimeout(t2);
    clearTimeout(t3);
    clearTimeout(t4);
    t4 = setTimeout(notDirectMode, time4);
}

function notDirectMode() {
    if (!on)
        return;
    directing = false;
    blacklisting = true;
    clearTimeout(t3);
    t3 = setTimeout(directMode, time3);
    blacklistMode();
}

function reloadAllTabs() {
    chrome.tabs.query({windowType:'normal'}, function(tabs) {
        for(var i = 0; i < tabs.length; i++) {
            chrome.tabs.update(tabs[i].id, {url: tabs[i].url});
        }
    });
}