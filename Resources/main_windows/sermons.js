var toolActInd = Ti.UI.createActivityIndicator();
Ti.UI.currentWindow.setRightNavButton(toolActInd);
toolActInd.show();

// create table view data object
var data = [];
var newXMLlink = "";

var xhr = Ti.Network.createHTTPClient();
xhr.open("GET","http://journeyon.net/media/api/churchapp/all-series.xml");
xhr.onload = function() {
	try {
		Ti.API.info('[sermons.js] got rss feed!');
		var doc = this.responseXML.documentElement;
		var items = doc.getElementsByTagName("row");
		var x = 0;
		Ti.API.info('[sermons.js] number of items = \'' + items.length + '\'');
		for (var c = 0; c < items.length; c++) {
			// Grab data from XML
			var item = items.item(c);
			var media = item.getElementsByTagName("icon").item(0).text;
			var title = item.getElementsByTagName("name").item(0).text;
			title = title.replace(/&#039;/g, "'").replace("/&amp;/g", "&");
			Ti.API.info('[sermons.js]   Processing #' + c + " - " + title);

			// Set up display of row
			var row = Ti.UI.createTableViewRow({height:80});
			var label = Ti.UI.createLabel( {
				text:title,
				left:72,
				top:5,
				font:{fontWeight:'bold',fontSize:18},
				bottom:5,
				right:5
			});
			row.add(label);
			var img = Ti.UI.createImageView({
				url:media,
				left:5,
				height:60,
				width:60
			});
			row.add(img);
			row.url = item.getElementsByTagName("link").item(0).text;
			row.titleStr = title;
			data[x++] = row;
		}

		// Create and add the tableview to the window
		var tableview = Ti.UI.createTableView({data:data});
		Ti.UI.currentWindow.add(tableview);

		toolActInd.hide();
		Ti.UI.currentWindow.setRightNavButton(null);

		// Add event listener for selection
		tableview.addEventListener('click',function(e) {
			if (e.rowData.url) {
				var win = Ti.UI.createWindow({
					barColor:'#111',
					title:e.rowData.titleStr,
					url:'../sermonviews/series.js'
				});
				newXMLlink = e.rowData.url;
				win.newXMLlink = newXMLlink;

				Ti.UI.currentTab.open(win, {animated:true});
			}
		});
	} catch(E) {
		alert(E);
	}
};
xhr.send();

