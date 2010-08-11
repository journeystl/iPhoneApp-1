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
			var dateText = item.getElementsByTagName("pubDate").item(0).text;
			var dateArray = dateText.split(" ");
			dateText = "" + dateArray[2] + " " + dateArray[1] + " " + dateArray[3];
			Ti.API.info('[blog.js]   Processing #' + c + " - " + title);

			// Set up display of row
			var row = Ti.UI.createTableViewRow({height:100});
			var label = Ti.UI.createLabel( {
				text:title,
				left:75,
				top:5,
				height:60,
				font:{fontWeight:'bold',fontSize:18},
				right:5
			});
			row.add(label);
			var deslabel = Ti.UI.createLabel( {
				text:description,
				minimumFontSize:12,
				left:75,
				top:65,
				height:30,
				right:5
			});
			row.add(deslabel);
			var dateLabel = Ti.UI.createLabel({
				text:dateText,
				//backgroundColor:'#4c6595',
				backgroundGradient:{
			        type:'linear',
			        colors:[{color:'#4c6595',position:0.0},{color:'#213e79',position:1.00}]
			    },
				shadowColor:'#243552',
				shadowOffset:{x:2,y:2},
				borderColor:"#374f80",
				borderRadius:5,
				borderWidth:2,
				textAlign:'center',
			    color:'#f3f5f8',
				left:5,
				top:20,
				height:60,
				font:{fontSize:14,fontWeight:'bold'},
				width:60
			});
			row.add(dateLabel);
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

