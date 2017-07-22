import 'github-markdown-css/github-markdown.css';
import MarkdownIt from 'markdown-it';
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';
import './index.less';

(() => {

  const $body = document.getElementsByTagName('body')[0];
  const $grid = document.getElementsByClassName('grid-wrapper')[0];
  const $split = document.getElementsByClassName('grid-split')[0];

  const $source = document.getElementById('source');
  const $dest = document.getElementById('dest');

  // handle resize event
  var handleMousemove = (event) => {
    event.preventDefault();

    const leftSize = (event.screenX - 7.5) / document.body.clientWidth * 100;
    const rightSize = 99 - leftSize;

    $grid.style.gridTemplateColumns = `${leftSize}% 15px ${rightSize}%`;
  };

  $split.addEventListener('mousedown', (e) => {
    e.preventDefault();
    $body.addEventListener('mousemove', handleMousemove);
  });

  $body.addEventListener('mouseup', (e) => {
    e.preventDefault();
    $body.removeEventListener('mousemove', handleMousemove);
  });

  const md = new MarkdownIt({
    highlight: function (str, lang) {
      if (lang && hljs.getLanguage(lang)) {
        try {
          return '<pre class="hljs"><code>' +
            hljs.highlight(lang, str, true).value +
            '</code></pre>';
        } catch (__) {
        }
      }

      return ''; // use external default escaping
    }
  });

  $source.addEventListener('keyup', (e) => {
    e.preventDefault();
    $dest.innerHTML = md.render($source.value);
  });

  // initial text
  if ($source.value) {
    $dest.innerHTML = md.render($source.value);
  }
})();