# Markdown Live Editor

### Overview

Windows 上的 MarkdownPad 的确很好用，但是不支持语法高亮、动态的 LaTeX 公式等功能（其实是支持的，只是要在收费的 Pro 版才支持），网上找了半天还是没有支持数学公式的，所以还是自己撸一个可以支持的动态解析的 Markdown 编辑器，方便自己写一下各种东西=-=

现在这是一个 Web 的版本，以后可能会做成 PC 的应用。

### Install

1. `git clone https://github.com/ryancui-/markdown-live-editor.git`

2. 在浏览器打开 `index.html`，OK~

### Usage

在左边的框框里输入 Markdown，右边就直接可以 Preview 了。

### Dependency/Reference

- MathJax: [`MathJax`][mathjax]
- Javascript Markdown Parser: [`markdown-js`][markdown.js]
- Github Markdown CSS: [`github-markdown-css`][github-markdown]

### Todo

- 加入代码高亮
- 目前 MathJax 的解析有点效率太低了，可能采用用户自定义是否需要进行 TeX/LaTeX 的解析会比较方便
- 一键复制、自动下载、PDF？
- 界面美化、PC 端？

[mathjax]: https://github.com/mathjax/MathJax
[markdown.js]: https://github.com/evilstreak/markdown-js
[github-markdown]: https://github.com/sindresorhus/github-markdown-css