const runJavaScript = (js) => {
  const script = document.createElement('script')
  const scriptContents = document.createTextNode(js)
  script.appendChild(scriptContents)
  document.body.appendChild(script)
}

const runCSS = (css) => {
  const s = document.createElement('style')
  s.innerHTML = css
  document.getElementsByTagName('head')[0].appendChild(s)
}

const runHTML = (html) => {
  document.body.innerHTML = html
}

window.addEventListener('message', function (evt) {
  switch (evt.data.command) {
    case 'custom_html':
      runHTML(evt.data.value)
      break
    case 'custom_css':
      runCSS(evt.data.value)
      break
    case 'custom_js':
      runJavaScript(evt.data.value)
      break
    default:
      break
  }
})
