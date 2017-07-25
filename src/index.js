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
    this.initFileOpen();

    // parse anything originally there
    if (this.$source.value) {
      this.parseMarkdown();
    }
  }

  initVariables() {
    this.$body = document.body;
    this.$split = document.getElementsByClassName('grid-split')[0];
    this.$source = document.getElementById('source');
    this.$dest = document.getElementById('dest');
    this.$input = document.getElementsByClassName('grid-input')[0];

    this.$file = document.getElementById('file');

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

        this.$input.classList.add('flex-basis-transition');
        if (this.$input.style.flexBasis === '0px') {
          this.$input.style.flexBasis = this.$body.clientWidth - 15 + 'px';
        } else {
          this.$input.style.flexBasis = '0px';
        }

        // wait until the animation finish
        setTimeout(() => {
          this.$input.classList.remove('flex-basis-transition');
        }, 800);

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
      this.parseMarkdown();
    });
  }

  initFileOpen() {
    const ctrlKey = 17;
    const cmdKey = 91;

    document.addEventListener('keydown', e => {
      if (e.keyCode === ctrlKey || e.keyCode === cmdKey) {
        this.ctrl = true;
      }

      if (this.ctrl) {
        if (e.keyCode === 79) {
          e.preventDefault();
          this.$file.click();
        }
      }
    });

    document.addEventListener('keyup', e => {
      if (e.keyCode === ctrlKey || e.keyCode === cmdKey) {
        this.ctrl = false;
      }
    });

    this.$file.addEventListener('change', e => {
      const reader = new FileReader();

      reader.onload = e => {
        this.$source.value = reader.result;
        this.parseMarkdown();
      };
      reader.readAsText(this.$file.files[0]);
    });
  }

  parseMarkdown() {
    this.$dest.innerHTML = this.md.render(this.$source.value);
  }
}
;

const prettyMarkdown = new PrettyMarkdown();
