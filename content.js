//alert("Hello from your Chrome extension!");
//alert(window.location.href);

//window.onload = setTimeout(redirect, 3000);

function redirect() {
  if (window.location.href != "http://www.usaco.org/")
    window.location.href = 'http://www.usaco.org/';
}


/*
window.onbeforeunload = function(event) {
    event.returnValue = "Write something clever here..";
};
*/
/*
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.message === "clicked_browser_action") {
      var firstHref = $("a[href^='http']").eq(0).attr("href");
      console.log(firstHref);
    }
  }
)
*/

//chrome.tabs.reload();
