import 'github-markdown-css/github-markdown.css';
import MarkdownIt from 'markdown-it';
import './lib/highlight.pack';
import './lib/highlight.css';
import './index.less';

(() => {

  const $body = document.getElementsByTagName('body')[0];
  const $grid = document.getElementsByClassName('grid-wrapper')[0];
  const $split = document.getElementsByClassName('grid-split')[0];

  // handle resize event
  var handleMousemove = (event) => {
    event.preventDefault();

    const leftSize = (event.screenX - 7.5) / document.body.clientWidth * 100;
    const rightSize = 100 - leftSize;

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

})();