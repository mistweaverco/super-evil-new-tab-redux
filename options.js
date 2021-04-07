const editor_custom_html = ace.edit("custom_html");
editor_custom_html.setTheme("ace/theme/dracula");
editor_custom_html.session.setMode("ace/mode/html");
const editor_custom_css = ace.edit("custom_css");
editor_custom_css.setTheme("ace/theme/dracula");
editor_custom_css.session.setMode("ace/mode/css");
const editor_custom_js = ace.edit("custom_js");
editor_custom_js.setTheme("ace/theme/dracula");
editor_custom_js.session.setMode("ace/mode/javascript");

const form = document.getElementById('form')

const saveAll = () => {
  chrome.storage.sync.set({
    custom_html: editor_custom_html.getValue(),
    custom_css: editor_custom_css.getValue(),
    custom_js: editor_custom_js.getValue()
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
  editor_custom_html.setValue(data.custom_html);
  editor_custom_css.setValue(data.custom_css);
  editor_custom_js.setValue(data.custom_js);
});
