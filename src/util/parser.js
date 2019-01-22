import MarkdownIt from 'markdown-it'
import hljs from 'highlight.js'

const parser = new MarkdownIt({
  html: true,
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return '<pre class="hljs"><code>' +
          hljs.highlight(lang, str, true).value +
          '</code></pre>'
      } catch (__) {
      }
    }

    return ''
  }
})

export default parser
