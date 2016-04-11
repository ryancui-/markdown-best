// hljs.initHighlightingOnLoad();

(function(markdown) {

	var $text = $("#text");
	var $preview = $("#markdown");

	$text.on('input', function() {
		var content = $text.val();
		$preview.html(markdown.toHTML(content));

		$preview.find('code').each(function(i, block) {
			hljs.highlightBlock(block);
		});

		MathJax.Hub.Queue(['Typeset', MathJax.Hub]);
	});

	// 文本框 Tab 键缩进
	// TODO 选中文本后 tab 会直接删除该文本
	$text.on('keydown', function(e) {
		var keyCode = e.keyCode || e.which;
		var $this = $(this);

		if (keyCode == 9) {
			e.preventDefault();
			var start = $this.get(0).selectionStart;
			var end = $this.get(0).selectionEnd;

			// // set textarea value to: text before caret + tab + text after caret
			// $this.val($this.val().substring(0, start)
	  //           + "\t"
	  //           + $this.val().substring(end));

			// // put caret at right position again
			// $this.get(0).selectionStart = $this.get(0).selectionEnd = start + 1;
			// console.log($this[0].value.substring(start, end).indexOf('哎'));

			var selection = $this[0].value.substring(start, end);
			var lineNumber = 0, remain = selection;
			while (true) {
				var newLine = remain.indexOf('\n');
				if (newLine === -1) {
					lineNumber = lineNumber + 1;
					break;
				}
				lineNumber = lineNumber + 1;
				remain = remain.substring(newLine + 1);
			}

			console.log(lineNumber);
		}
	});

})(markdown);