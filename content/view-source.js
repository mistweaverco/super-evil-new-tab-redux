const htmlentities = (str) => {
  return str.replace(/[\u00A0-\u9999<>&]/g, (i) => {
    return '&#' + i.charCodeAt(0) + ';'
  })
}

window.addEventListener('message', function (evt) {
  switch (evt.data.command) {
    case 'custom_html':
      document.getElementById('custom_html').innerHTML = htmlentities(evt.data.value)
      break
    case 'custom_css':
      document.getElementById('custom_css').innerHTML = htmlentities(evt.data.value)
      break
    case 'custom_js':
      document.getElementById('custom_js').innerHTML = htmlentities(evt.data.value)
      break
    default:
      break
  }
  window.hljs.highlightAll()
})
