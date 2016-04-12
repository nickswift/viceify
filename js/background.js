(function() {
	var runContentScripts = function(info, tab) {

		chrome.tabs.executeScript(tab.id, {
				"file": "js/content.js"
			},
			function() {
				console.log('it worked!');
			});

	};

	chrome.runtime.onInstalled.addListener(function() {
		chrome.contextMenus.create({
			id: 'viceify',
			title: 'viceify this page',
			contexts: ['page']
		}, function() {
			console.log('created context menu');
		});
	});

	chrome.contextMenus.onClicked.addListener(runContentScripts);
})();