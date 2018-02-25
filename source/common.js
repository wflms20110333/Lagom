
"use strict";

(function()
{
  // Both Edge and Mozilla Web Extensions use the namespace
  // 'browser' instead of 'chrome'. Edge has chrome namespace defined,
  // in some cases, but only with one property: 'app'.
  if (typeof chrome == "undefined" || typeof chrome.extension == "undefined")
    window.chrome = window.browser;

  window.ext = {};

  let EventTarget = ext._EventTarget = function()
  {
    this._listeners = new Set();
  };
  EventTarget.prototype = {
    addListener(listener)
    {
      this._listeners.add(listener);
    },
    removeListener(listener)
    {
      this._listeners.delete(listener);
    },
    _dispatch(...args)
    {
      let results = [];

      for (let listener of this._listeners)
        results.push(listener(...args));

      return results;
    }
  };

  // Workaround since HTMLCollection and NodeList didn't have iterator support
  // before Chrome 51.
  // https://bugs.chromium.org/p/chromium/issues/detail?id=401699
  let arrayIterator = Array.prototype[Symbol.iterator];
  if (!(Symbol.iterator in HTMLCollection.prototype))
    HTMLCollection.prototype[Symbol.iterator] = arrayIterator;
  if (!(Symbol.iterator in NodeList.prototype))
    NodeList.prototype[Symbol.iterator] = arrayIterator;

  /* Message passing */

  ext.onMessage = new ext._EventTarget();


  /* Background page */

  ext.backgroundPage = {
    sendMessage: chrome.runtime.sendMessage,
    getWindow()
    {
      return chrome.extension.getBackgroundPage();
    }
  };


  /* Utils */

  ext.getURL = chrome.extension.getURL;
  ext.i18n = chrome.i18n;
}());