// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Ti.UI.setBackgroundColor('#000');

// create tab group
var tabGroup = Ti.UI.createTabGroup();

// Tab 1
var win1 = Ti.UI.createWindow({  
	title:'Church Blogs',
	barColor:'#111',
	url:'main_windows/blog.js'
	//backgroundColor:'#fff'
});
var tab1 = Ti.UI.createTab({  
	icon:'img/09-chat2.png',
	title:'Blogs',
	window:win1
});

// Tab 2
var win2 = Ti.UI.createWindow({  
	title:'Sermons',
	barColor:'#111',
	url:'main_windows/sermons.js'
	//backgroundColor:'#fff'
});
var tab2 = Ti.UI.createTab({  
	icon:'img/120-headphones.png',
	title:'Sermons',
	window:win2
});

// Tab 3
var win3 = Ti.UI.createWindow({  
	title:'Church Events Calendar',
	barColor:'#111',
	url:'main_windows/calendar.js'
	//backgroundColor:'#fff'
});
var tab3 = Ti.UI.createTab({  
	icon:'img/83-calendar.png',
	title:'Calendar',
	window:win3
});

// Tab 4
var win4 = Ti.UI.createWindow({  
	title:'Engage Scripture',
	barColor:'#111',
	url:'main_windows/engage.js'
	//backgroundColor:'#fff'
});
var tab4 = Ti.UI.createTab({  
	icon:'img/96-book.png',
	title:'Engage',
	window:win4
});

//  add tabs
tabGroup.addTab(tab1);  
tabGroup.addTab(tab4);  
tabGroup.addTab(tab2);  
tabGroup.addTab(tab3);  


// open tab group
tabGroup.open();

