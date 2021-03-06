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
			if (items == null) {
				var nonefound = Ti.UI.createLabel( {
					text:'No events found!',
					left:5,
					top:95,
					textAlign:'center',
					font:{fontSize:24,fontWeight:'bold'},
					height:45,
					right:5
				});
				Ti.UI.currentWindow.add(nonefound);
			} else {
				Ti.API.info('[cal_common.js] number of items = \'' + items.length + '\'');
				for (var c = 0; c < items.length; c++) {
					// Grab data from XML
					var item = items.item(c);
					var title = item.getElementsByTagName("name").item(0).text;
					var datetime = item.getElementsByTagName("date").item(0).text;
					var alternative = item.getElementsByTagName("alternative").item(0).text
					var dateArray = datetime.split(" ");
					dateText = "" + dateArray[2] + " " + dateArray[1] + " " + dateArray[3];
					var monthText = "" + dateArray[2];
					var dayText = "" + dateArray[1];
					/*
					var titlearr = title.split(" ");
					var campus = "" + titlearr[0].charAt(0) + titlearr[1].charAt(0);
					title = titlearr[2];
					for (var i = 3; i < titlearr.length; i++) {
						title = title + " " + titlearr[i];
					}
					*/

					Ti.API.info('[cal_common.js]   Processing #' + c + " - " + title);

					// Set up display of row
					var row = Ti.UI.createTableViewRow({height:70});
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
						text:alternative,
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
					
					/*
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
					*/
					row.titleStr = title;
					row.url = item.getElementsByTagName("shorturlayl").item(0).text;
					data[c] = row;
				}


				// Create and add the tableview to the window
				var tableview = Ti.UI.createTableView({data:data});
				Ti.UI.currentWindow.add(tableview);
				// Add event listener for selection
				tableview.addEventListener('click',function(e) {
					/*
					var win = Ti.UI.createWindow({
						title:e.rowData.titleStr,
						barColor:'#111',
						url:'singleevent.js'
					});
					newXMLlink = e.rowData.url;
					win.newXMLlink = newXMLlink;
					*/
						var win = Ti.UI.createWindow({
							title:e.rowData.titleStr,
							barColor:'#111'
							//url:'singleevent.js'
						});
					var webview = Titanium.UI.createWebView({url:e.rowData.url});
					win.add(webview);
					Ti.UI.currentTab.open(win, {animated:true});
				});
			}

			toolActInd.hide();
			Ti.UI.currentWindow.setRightNavButton(null);


		} catch(E) {
			alert(E);
		}
	};
	xhr.send();
}
