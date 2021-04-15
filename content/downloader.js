window.downloader = function (url, cb) {
  const xhr = new window.XMLHttpRequest()

  xhr.open('GET', url)

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        cb(null, xhr.responseText)
      } else {
        cb(xhr)
      }
    }
  }

  xhr.send()
}
