/*
 * This file is part of Lagom <https://www.aboutlagom.com/>,
 * Copyright (C) 2018-present N. Shaw, S. Suhail, A. Wang, E. Zou
 */

 check();
setInterval(check, 1000); // change this to one minute

function redirect2() {
  window.location.href = 'https://www.aboutlagom.com/focus';
}

function redirect() {
  window.location.href = 'https://www.aboutlagom.com/unplug';
}

function goBack() {
  if (history.length == 0)
    document.location = document.referrer;
  else
    history.go(-1);
}

function check() {
  chrome.runtime.sendMessage({greeting: "checkState"}, function(response) {
    if (window.location.href == 'https://www.aboutlagom.com/unplug') {
      if (!response.on2)
        goBack();
    }
    else if (!window.location.href.endsWith("options.html")) {
      if (response.on2)
        redirect();
      else if (window.location.href == 'https://www.aboutlagom.com/focus') {
        if (!response.on1)
          goBack();
      }
      else if (response.on1) {
        chrome.runtime.sendMessage({greeting: "checkIfBlocked", url: window.location.href}, function(response2) {
          if (response2.blocked)
            redirect2();
        });
      }
    }
  });
}