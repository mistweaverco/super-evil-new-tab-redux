const sandbox = document.getElementById('sandbox')
const sandboxWindow = sandbox.contentWindow
sandbox.addEventListener('load', () => {
  chrome.storage.sync.get(['custom_html', 'custom_css', 'custom_js'], function (data) {
    if (data.custom_html.length > 0) {
      sandboxWindow.postMessage({
        command: 'custom_html',
        value: data.custom_html
      }, '*')
    }
    if (data.custom_css.length > 0) {
      sandboxWindow.postMessage({
        command: 'custom_css',
        value: data.custom_css
      }, '*')
    }
    if (data.custom_js.length > 0) {
      sandboxWindow.postMessage({
        command: 'custom_js',
        value: data.custom_js
      }, '*')
    }
    console.log(data)
  })
})
