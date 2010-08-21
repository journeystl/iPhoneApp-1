var toolActInd = Ti.UI.createActivityIndicator();
Ti.UI.currentWindow.setRightNavButton(toolActInd);
toolActInd.show();

// create table view data object
var data = [];
var singleSermonXML = ""; // string to pass to sermon.js

var xhr = Ti.Network.createHTTPClient();
xhr.open("GET", Ti.UI.currentWindow.newXMLlink); // newXMLlink set in main_windows/sermons.js
xhr.onload = function() {
	try {
		Ti.API.info('[series.js] got rss feed!');
		var doc = this.responseXML.documentElement;
		var items = doc.getElementsByTagName("row");
		var x = 0;
		Ti.API.info('[series.js] number of items = \'' + items.length + '\'');
		for (var c = 0; c < items.length; c++) {
			// Grab data from XML
			var item = items.item(c);
			var title = item.getElementsByTagName("name").item(0).text;
			var verses = item.getElementsByTagName("alternative").item(0).text;
			var dateText = item.getElementsByTagName("date").item(0).text;
			var dateArray = dateText.split(" ");
			dateText = "" + dateArray[2] + " " + dateArray[1] + " " + dateArray[3];
			var monthText = "" + dateArray[2];
			var dayText = "" + dateArray[1];
			
			Ti.API.info('[series.js]   Processing #' + c + " - " + title);

			// Set up display of row
			/*
			var row = Ti.UI.createTableViewRow({height:100});
			var label = Ti.UI.createLabel( {
				text:title,
				left:70,
				top:5,
				height:90,
				font:{fontWeight:'bold',fontSize:18},
				right:5
			});
			row.add(label);
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
			*/
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
				text:verses,
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
					title:'Sermon',
					url:'../sermonviews/sermon.js'
				});
				singleSermonXML = e.rowData.url;
				win.singleSermonXML = singleSermonXML;
				Ti.UI.currentTab.open(win, {animated:true});
			}
		});
	} catch(E) {
		alert(E);
	}
};
xhr.send();

