// create table view data object
var data = [
	{title:'Tower Grove Campus', hasChild:true, test:'../calendarviews/cal_tg.js'},
	{title:'Hanley Road Campus', hasChild:true, test:'../calendarviews/cal_hr.js'},
	{title:'West County Campus', hasChild:true, test:'../calendarviews/cal_wc.js'},
	{title:'Metro East Campus', hasChild:true, test:'../calendarviews/cal_me.js'}
];

// create table view
var tableview = Ti.UI.createTableView({data:data});

// create table view event listener
tableview.addEventListener('click', function(e) {
	if (e.rowData.test) {
		var win = null;
		if (Ti.Platform.name == "android") {
			win = Ti.UI.createWindow({
				url:e.rowData.test,
				title:e.rowData.title
			});	
		} else {
			win = Ti.UI.createWindow({
				url:e.rowData.test,
				title:e.rowData.title,
				backgroundColor:'#fff',
				barColor:'#111'
				
			});
		}
		
		Ti.UI.currentTab.open(win,{animated:true});
	}
});

// add table view to the window
Ti.UI.currentWindow.add(tableview);


