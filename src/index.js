import 'github-markdown-css/github-markdown.css';
import MarkdownIt from 'markdown-it';
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';
import './index.less';

class PrettyMarkdown {

  constructor() {
    this.initVariables();
    this.initResizeEvent();
    this.initMarkdownParser();

    // parse anything originally there
    if (this.$source.value) {
      this.$dest.innerHTML = this.md.render(this.$source.value);
    }
  }

  initVariables() {
    this.$body = document.body;
    this.$split = document.getElementsByClassName('grid-split')[0];
    this.$source = document.getElementById('source');
    this.$dest = document.getElementById('dest');
    this.$input = document.getElementsByClassName('grid-input')[0];

    this.prevClick = null;
    this.prevScreenX = null;
    this.prevFlexBasic = null;
  }

  initResizeEvent() {
    this.$split.addEventListener('mousedown', (e) => {
      e.preventDefault();

      this.mousedown = true;

      // TODO use diff not the target value
      this.prevFlexBasic = this.$input.style.flexBasic;
      this.prevScreenX = e.screenX;

      if (this.prevClick && Date.now() - this.prevClick < 300) {
        if (this.$input.style.flexBasis === '0px') {
          this.$input.style.flexBasis = this.$body.clientWidth - 15 + 'px';
        } else {
          this.$input.style.flexBasis = '0px';
        }

        this.prevClick = null;
      } else {
        this.prevClick = Date.now();
      }
    });

    this.$body.addEventListener('mousemove', e => {
      if (this.mousedown) {
        e.preventDefault();
        this.$input.style.flexBasis = event.screenX - 17 + 'px';
      }
    });

    this.$body.addEventListener('mouseup', e => {
      this.mousedown = false;
    });
  }

  initMarkdownParser() {
    this.md = new MarkdownIt({
      highlight: function (str, lang) {
        if (lang && hljs.getLanguage(lang)) {
          try {
            return '<pre class="hljs"><code>' +
              hljs.highlight(lang, str, true).value +
              '</code></pre>';
          } catch (__) {
          }
        }

        return '';
      }
    });

    this.$source.addEventListener('keyup', e => {
      e.preventDefault();
      this.$dest.innerHTML = this.md.render(this.$source.value);
    });
  }
}
;

const prettyMarkdown = new PrettyMarkdown();
