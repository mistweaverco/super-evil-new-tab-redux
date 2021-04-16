'use strict'

chrome.webRequest.onHeadersReceived.addListener(
  window.onHeadersReceivedDetectConfigFile,
  { urls: ['*://*/*.sentr.json'], types: ['main_frame'] },
  ['blocking', 'responseHeaders'])
