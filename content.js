
chrome.runtime.sendMessage({greeting: "hello"}, function(response) {
  if (window.location.href == "http://www.usaco.org/")
    window.onload = setTimeout(goBack, response.time2);
  else if (window.location.href != "chrome-extension://fpnaaplokponhkaepckppjikjpjacbfk/options.html")
    window.onload = setTimeout(redirect, response.time1);
});

function redirect() {
  window.location.href = 'http://www.usaco.org/';
}

function goBack() {
  if (history.length == 0)
    document.location = document.referrer;
  else
    history.go(-1);
}

//chrome.tabs.reload();
