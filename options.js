const editorCustomHTML = window.ace.edit('custom_html')
editorCustomHTML.setTheme('ace/theme/dracula')
editorCustomHTML.session.setMode('ace/mode/html')
editorCustomHTML.session.setOptions({ tabSize: 2, useSoftTabs: false })

const editorCustomCSS = window.ace.edit('custom_css')
editorCustomCSS.setTheme('ace/theme/dracula')
editorCustomCSS.session.setMode('ace/mode/css')
editorCustomCSS.session.setOptions({ tabSize: 2, useSoftTabs: false })

const editorCustomJS = window.ace.edit('custom_js')
editorCustomJS.setTheme('ace/theme/dracula')
editorCustomJS.session.setMode('ace/mode/javascript')
editorCustomJS.session.setOptions({ tabSize: 2, useSoftTabs: false })

const form = document.getElementById('form')
const customBgColor = document.getElementById('custom_bgcolor')
const file = document.getElementById('file')
const exportBtn = document.getElementById('export_btn')
const importBtn = document.getElementById('import_btn')

if (window.localStorage.getItem('bgColor')) {
  customBgColor.value = window.localStorage.getItem('bgColor')
} else {
  customBgColor.value = '#000000'
}

const saveAll = () => {
  window.localStorage.setItem('bgColor', customBgColor.value)
  chrome.storage.sync.set({
    custom_html: editorCustomHTML.getValue(),
    custom_css: editorCustomCSS.getValue(),
    custom_js: editorCustomJS.getValue()
  })
}

const downloadContent = function (filename, datastr, mimetype) {
  mimetype = mimetype || 'text/plain'
  const el = document.createElement('a')
  el.setAttribute(
    'href',
    'data:' +
    mimetype +
    ';charset=utf-8,' +
    encodeURIComponent(datastr)
  )
  el.setAttribute('download', filename)
  el.style.display = 'none'
  document.body.appendChild(el)
  el.click()
  document.body.removeChild(el)
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

file.addEventListener('change', function (event) {
  const reader = new window.FileReader()

  reader.onload = function (event) {
    const config = JSON.parse(event.target.result)
    if (config.data.bgColor) {
      customBgColor.value = config.data.bgColor
    }
    editorCustomHTML.setValue(config.data.html)
    editorCustomCSS.setValue(config.data.css)
    editorCustomJS.setValue(config.data.javascript)
    saveAll()
  }

  reader.readAsText(event.target.files[0])
})

exportBtn.addEventListener('click', (evt) => {
  evt.preventDefault()
  const configObject = {
    name: 'Super Evil New Tab Redux Configuration',
    data: {}
  }
  configObject.data.bgColor = customBgColor.value
  configObject.data.html = editorCustomHTML.getValue()
  configObject.data.css = editorCustomCSS.getValue()
  configObject.data.javascript = editorCustomJS.getValue()
  downloadContent('SuperEvilNewTabRedux.sentr.json', JSON.stringify(configObject))
})

importBtn.addEventListener('click', (evt) => {
  evt.preventDefault()
  file.click()
})
