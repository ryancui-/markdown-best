// hljs.initHighlightingOnLoad();

(function(markdown) {

	var $text = $("#text");
	var $preview = $("#markdown");

	$text.tabOverride(true);
	

	$text.on('input', function() {
		var content = $text.val();
		$preview.html(markdown.toHTML(content));

		$preview.find('code').each(function(i, block) {
			hljs.highlightBlock(block);
		});

		MathJax.Hub.Queue(['Typeset', MathJax.Hub]);
	});

})(markdown);