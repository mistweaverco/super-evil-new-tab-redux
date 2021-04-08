const editorCustomHTML = window.ace.edit('custom_html')
editorCustomHTML.setTheme('ace/theme/dracula')
editorCustomHTML.session.setMode('ace/mode/html')

const editorCustomCSS = window.ace.edit('custom_css')
editorCustomCSS.setTheme('ace/theme/dracula')
editorCustomCSS.session.setMode('ace/mode/css')

const editorCustomJS = window.ace.edit('custom_js')
editorCustomJS.setTheme('ace/theme/dracula')
editorCustomJS.session.setMode('ace/mode/javascript')

const form = document.getElementById('form')

const saveAll = () => {
  chrome.storage.sync.set({
    custom_html: editorCustomHTML.getValue(),
    custom_css: editorCustomCSS.getValue(),
    custom_js: editorCustomJS.getValue()
  })
}

form.addEventListener('submit', (evt) => {
  evt.preventDefault()
  saveAll()
})

document.addEventListener('keydown', (evt) => {
  if (evt.ctrlKey && evt.key === 's') {
    evt.preventDefault()
    saveAll()
  }
})

chrome.storage.sync.get(['custom_html', 'custom_css', 'custom_js'], function (data) {
  editorCustomHTML.setValue(data.custom_html)
  editorCustomCSS.setValue(data.custom_css)
  editorCustomJS.setValue(data.custom_js)
})
