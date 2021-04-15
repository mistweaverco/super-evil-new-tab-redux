'use strict';
chrome.webRequest.onHeadersReceived.addListener(
    onHeadersReceivedDetectConfigFile,
    {'urls': ['*://*/*.sentr.json'], 'types': ['main_frame']},
    ['blocking', 'responseHeaders']);
