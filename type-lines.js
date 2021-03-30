// Type each character one by one to the given target element
// with a delay. If a callback is passed, it will run when the
// lines are done printing
function typeLines(target, lines, delay, callback = null) {
	// All lines have been printed
	if (!lines.length) {
		if (callback) {
			callback();
		}
		return;
	}

	const [head, ...tail] = lines[0];
	lines[0] = tail;
	target.innerHTML += head;

	// A line is done printing
	if (!tail.length) {
		lines.shift();

		// Don't add the line breaks on the last line
		if (lines.length > 0) {
			target.innerHTML += '<br><br>';
		}
	}

	setTimeout(() => {
		typeLines(target, lines, delay, callback);
	}, delay);
}

// Usage:
// typeLines(document.querySelector('#textbox'), ['Foo', 'Bar'], 50)