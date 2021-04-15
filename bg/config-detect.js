'use strict';
/* Detect config files, possibly open the installation dialog. */

(function () {
  const gContentTypeRe = (() => {
    const configFileTypes = [
      'text/plain',
      'application/json',
      'text/json'
    ]
    return new RegExp(`^(${configFileTypes.join('|')})\\b`)
  })()

  function responseHasConfigFileType (responseHeaders) {
    for (const header of responseHeaders) {
      const headerName = header.name.toLowerCase()
      if (headerName === 'content-type' && gContentTypeRe.test(header.value)) {
        return true
      }
    }
    return false
  }

  function onHeadersReceivedDetectConfigFile (requestDetails) {
    if (requestDetails.method !== 'GET') return {}
    if (!responseHasConfigFileType(requestDetails.responseHeaders)) return {}

    openInstallDialog(requestDetails.url)

    // https://stackoverflow.com/a/18684302
    return { redirectUrl: 'javascript:' }
  }
  window.onHeadersReceivedDetectConfigFile = onHeadersReceivedDetectConfigFile

  function openInstallDialog (url) {
    chrome.runtime.getPlatformInfo(platform => {
      const installUrl = chrome.runtime.getURL('content/install-dialog.html') + '?' + escape(url)
      const options = {
        height: 600,
        type: 'popup',
        url: installUrl,
        width: 800
      }
      chrome.windows.create(options, newWindow => {})
    })
  }
})()
