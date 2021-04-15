const installButton = document.getElementById('install_btn')
const previewConfigButton = document.getElementById('preview_config_btn')
const viewSourceButton = document.getElementById('view_source_btn')
const cancelButton = document.getElementById('cancel_btn')
const sandbox = document.getElementById('sandbox')
const sandboxWindow = sandbox.contentWindow
const configFileURL = unescape(document.location.search.substr(1))

let customHTML = ''
let customCSS = ''
let customJS = ''

sandbox.addEventListener('load', () => {
  window.downloader(configFileURL, (err, res) => {
    console.log(err)
    const config = JSON.parse(res)
    console.log(config)
    if (config.data.html.length > 0) {
      customHTML = config.data.html
      sandboxWindow.postMessage({
        command: 'custom_html',
        value: customHTML
      }, '*')
    }
    if (config.data.css.length > 0) {
      customCSS = config.data.css
      sandboxWindow.postMessage({
        command: 'custom_css',
        value: customCSS
      }, '*')
    }
    if (config.data.javascript.length > 0) {
      customJS = config.data.javascript
      sandboxWindow.postMessage({
        command: 'custom_js',
        value: customJS
      }, '*')
    }
  })
})

installButton.addEventListener('click', (evt) => {
  evt.preventDefault()
  chrome.storage.sync.set({
    custom_html: customHTML,
    custom_css: customCSS,
    custom_js: customJS
  }, () => {
    window.close()
  })
})

previewConfigButton.addEventListener('click', (evt) => {
  evt.preventDefault()
  viewSourceButton.classList.remove('hidden')
  previewConfigButton.classList.add('hidden')
  sandbox.src = 'sandbox-preview.html'
})

viewSourceButton.addEventListener('click', (evt) => {
  evt.preventDefault()
  previewConfigButton.classList.remove('hidden')
  viewSourceButton.classList.add('hidden')
  sandbox.src = 'view-source.html'
})

cancelButton.addEventListener('click', (evt) => {
  evt.preventDefault()
  window.close()
})
