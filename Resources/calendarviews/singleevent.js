var toolActInd = Ti.UI.createActivityIndicator();
Ti.UI.currentWindow.setRightNavButton(toolActInd);
toolActInd.show();

// create table view data object
var data = [];

var xhr = Ti.Network.createHTTPClient();
xhr.open("GET", Ti.UI.currentWindow.newXMLlink); // set in sermonviews/series.js
xhr.onload = function() {
	try {
		Ti.API.info('[singleevent.js] got xml feed!');
		// Parse data out
		// TODO: Grab and display date.
		var doc = this.responseXML.documentElement;
		var content = doc.getElementsByTagName("content").item(0);
		var title = content.getElementsByTagName("title").item(0).text;
		var date = content.getElementsByTagName("date").item(0).text;
		var url = content.getElementsByTagName("url").item(0).text;

		var description = content.getElementsByTagName("description").item(0).text;
		description = description.replace(/\n/g, "").replace(/ +/g, " ");
		
		/*
		var audiourl = null;
		if (content.getElementsByTagName("audio")) {
			audiourl = content.getElementsByTagName("audio").item(0).text;
		}
		var videourl = null;
		if (content.getElementsByTagName("video")) {
			videourl = content.getElementsByTagName("video").item(0).text;
		}

		var altRows = content.getElementsByTagName("row");
		var altString = altRows.item(0).text;
		for (var i = 1; i < altRows.length; i++) {
			if (altRows.item(i).text.length > 0) {
				altString += ', ' + altRows.item(i).text;
			}
		}
		altString = altString.replace(/\n/g, "").replace(/ +/g, " ");
		*/


		toolActInd.hide();
		Ti.UI.currentWindow.setRightNavButton(null);
		// Display layout and data
		
		var win = Ti.UI.currentWindow;
		var webview = Titanium.UI.createWebView({url:url});
		//var window = Titanium.UI.createWindow({title:title});
		win.add(webview);
	} catch(E) {
		alert(E);
	}
};
xhr.send();

