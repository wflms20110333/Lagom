check();
setInterval(check, 1000); // change this to one minute

function redirect() {
  window.location.href = 'http://www.usaco.org/';
}

function goBack() {
  if (history.length == 0)
    document.location = document.referrer;
  else
    history.go(-1);
}

function check() {
  chrome.runtime.sendMessage({greeting: "hello"}, function(response) {
    if (window.location.href == "http://www.usaco.org/") {
      if (!response.direct)
        goBack();
      //window.onload = setTimeout(goBack, response.time2);
    }
    else if (!window.location.href.endsWith("options.html")) {
      console.log(response.direct);
      if (response.direct)
        redirect();
    }
      //window.onload = setTimeout(redirect, response.time1);
  });
}

chrome.tabs.reload(1);