var toolActInd = Ti.UI.createActivityIndicator();
Ti.UI.currentWindow.setRightNavButton(toolActInd);
toolActInd.show();

// create table view data object
var data = [];

var xhr = Ti.Network.createHTTPClient();
xhr.open("GET", "http://journeyon.net/blog/feed/churchapp/rss.xml"); 
xhr.onload = function() {
	try {
		Ti.API.info('[blog.js] got rss feed!');
		var doc = this.responseXML.documentElement;
		var items = doc.getElementsByTagName("item");
		var x = 0;
		Ti.API.info('[blog.js] number of items = \'' + items.length + '\'');
		for (var c = 0; c < items.length; c++) {
			// Grab data from XML
			var item = items.item(c);
			var title = item.getElementsByTagName("title").item(0).text;
			var description = item.getElementsByTagName("description").item(0).text;
			var creator = item.getElementsByTagName("dc:creator").item(0).text;
			var dateText = item.getElementsByTagName("pubDate").item(0).text;
			var dateArray = dateText.split(" ");
			dateText = "" + dateArray[2] + " " + dateArray[1] + " " + dateArray[3];
			var monthText = "" + dateArray[2];
			var dayText = "" + dateArray[1];
			Ti.API.info('[blog.js]   Processing #' + c + " - " + title);

			// Set up display of row
			var row = Ti.UI.createTableViewRow({height:60});
			var label = Ti.UI.createLabel( {
				text:title,
				left:45,
				top:5,
				height:30,
				font:{fontWeight:'bold',fontSize:18},
				right:5
			});
			row.add(label);
			var deslabel = Ti.UI.createLabel( {
				text:creator,
				//minimumFontSize:12,
				color:'#666666',
				left:45,
				top:35,
				height:20,
				right:5
			});
			row.add(deslabel);
			var monthLabel = Ti.UI.createLabel({
				text:monthText,
			    color:'#aaaaaa',
				left:5,
				top:5,
				height:20,
				font:{fontSize:14,fontWeight:'bold'},
				width:40
			});
			row.add(monthLabel);
			var dayLabel = Ti.UI.createLabel({
				text:dayText,
			    color:'#aaaaaa',
				left:5,
				top:20,
				height:35,
				font:{fontSize:24,fontWeight:'bold'},
				width:40
			});
			row.add(dayLabel);
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
				});
				var webview = Titanium.UI.createWebView({url:e.rowData.url});
				win.add(webview);

				Ti.UI.currentTab.open(win, {animated:true});
				
				//var window = Titanium.UI.createWindow({title:title});
			}
		});
	} catch(E) {
		alert(E);
	}
};
xhr.send();

