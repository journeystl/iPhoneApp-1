function grabCal(url) {

	var toolActInd = Ti.UI.createActivityIndicator();
	Ti.UI.currentWindow.setRightNavButton(toolActInd);
	toolActInd.show();


	// create table view data object
	var data = [];

	var xhr = Ti.Network.createHTTPClient();
	xhr.open("GET", url);
	xhr.onload = function() {
		try {
			Ti.API.info('[cal_common.js] got rss feed!');
			var doc = this.responseXML.documentElement;
			var items = doc.getElementsByTagName("row");
			Ti.API.info('[cal_common.js] number of items = \'' + items.length + '\'');
			for (var c = 0; c < items.length; c++) {
				// Grab data from XML
				var item = items.item(c);
				var title = item.getElementsByTagName("name").item(0).text;
				var datetime = item.getElementsByTagName("date").item(0).text;
				
				var titlearr = title.split(" ");
				var campus = "" + titlearr[0].charAt(0) + titlearr[1].charAt(0);
				title = titlearr[2];
				for (var i = 3; i < titlearr.length; i++) {
					title = title + " " + titlearr[i];
				}
				
				Ti.API.info('[cal_common.js]   Processing #' + c + " - " + title);

				// Set up display of row
				var row = Ti.UI.createTableViewRow({height:70});
				var campuslabel = Ti.UI.createLabel({
					text:campus,
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
					height:40,
					font:{fontSize:16,fontWeight:'bold'},
					width:40
				});
				var label = Ti.UI.createLabel( {
					text:title,
					left:55,
					top:5,
					height:45,
					right:5
				});
				var datelabel = Ti.UI.createLabel( {
					text:datetime,
					left:55,
					top:50,
					bottom:5,
					font:{fontSize:14},
					right:5
				});
				row.add(label);
				row.add(campuslabel);
				row.add(datelabel);
				row.titleStr = title;
				row.url = item.getElementsByTagName("link").item(0).text;
				data[c] = row;
			}

			// Create and add the tableview to the window
			var tableview = Ti.UI.createTableView({data:data});
			Ti.UI.currentWindow.add(tableview);

			toolActInd.hide();
			Ti.UI.currentWindow.setRightNavButton(null);

			// Add event listener for selection
			tableview.addEventListener('click',function(e) {
				var win = Ti.UI.createWindow({
					title:e.rowData.titleStr,
					barColor:'#111',
					url:'singleevent.js'
				});
				newXMLlink = e.rowData.url;
				win.newXMLlink = newXMLlink;

				Ti.UI.currentTab.open(win, {animated:true});
			});
		} catch(E) {
			alert(E);
		}
	};
	xhr.send();
}
