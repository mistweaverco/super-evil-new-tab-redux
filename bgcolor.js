((window, document) => {
  const bgColor = window.localStorage.getItem('bgColor')
  if (bgColor && bgColor.length) {
    const style = document.createElement('style')
    style.innerHTML = `html,body{background-color: ${bgColor}};`
    document.head.appendChild(style)
  }
})(window, document)
