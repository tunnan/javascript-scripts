// Dynamically load scripts using promises
function loadScripts(files) {
	const promises = files.map(file => new Promise((resolve, reject) => {
		const script = Object.assign(document.createElement('script'), {
			type: 'text/javascript',
			src: file,
			onload: () => resolve(file),
			onerror: () => reject(file)
		});
		document.body.append(script);
	}));

	return Promise.all(promises);
}

// Usage:
// loadScripts(['foo.js', 'bar.js']);