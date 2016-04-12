(function() {

	// note: this plugin is NSFW (so is VICE)
	var elements = document.getElementsByTagName('*');

	var curses = [
		'goddamn',
		'shitty',
		'stupid',
		'lame',
		'fucking',
		'goddamn',
		'motherfucking'
	];

	function randomCurseWord(prefix, suffix) {
		return ' ' + [prefix, curses[Math.floor(Math.random() * curses.length)], suffix].join(' ') + ' ';
	}

	// this is the meat of the extension
	function doReplacement(str) {

		// replace a bunch of common words and phrases with VICEisms
		// NOTE: I'm not sure how well this scales, but it's about as good
		// as JS can do.
		return str
			.replace(/\s(a\s*)?man\s/g, ' some guy ')
			.replace(/\sdoctor[\s\.]/g, ' my dealer ')
			.replace(/\sdoctors[\s\.]/g, ' the people at my dispensery ')
			.replace(/\sscientist[\s\.]/g, ' some smart guy ')
			.replace(/\sscientists[\s\.]/g, randomCurseWord('some', 'nerds'))
			.replace(/\sscience[\s\.]/g, ' cool stuff ')
			.replace(/\smany\s/g, ' a lot of ')
			.replace(/\s(in)?\s*the\s*world[\s\.]/g, ' somewhere outside of Brooklyn ')
			.replace(/\smy\s/g, randomCurseWord('my', ''))
			.replace(/\syour\s/g, randomCurseWord('your', ''))
			.replace(/\shis\s/g, randomCurseWord('his', ''))
			.replace(/\sher\s/g, randomCurseWord('her', ''))
			.replace(/\sa\s/g, randomCurseWord('a', ''));

		// TODO: insert random VICEy phrases
	}

	// walk over the DOM and process elements with readable text in them
	for (var i = 0; i < elements.length; i++) {
		var element = elements[i];

		for (var j = 0; j < element.childNodes.length; j++) {
			var node = element.childNodes[j];

			if (node.nodeType === 3) {
				var text = node.nodeValue;
				var replaced = doReplacement(text) || text;

				// only write changes to DOM if we've changed the string
				if (text !== replaced) {
					element.replaceChild(document.createTextNode(replaced), node);
				}
			}
		}
	}
})();