var toolActInd = Ti.UI.createActivityIndicator();
Ti.UI.currentWindow.setRightNavButton(toolActInd);
toolActInd.show();

// create table view data object
var data = [];

var xhr = Ti.Network.createHTTPClient();
xhr.open("GET", Ti.UI.currentWindow.singleSermonXML); // set in sermonviews/series.js
xhr.onload = function() {
	try {
		Ti.API.info('[sermon.js] got xml feed from ' + Ti.UI.currentWindow.singleSermonXML);
		// Parse data out
		// TODO: Grab and display date.
		var doc = this.responseXML.documentElement;
		var content = doc.getElementsByTagName("content").item(0);
		var title = content.getElementsByTagName("title").item(0).text;
		var seriestitle = content.getElementsByTagName("subtitle").item(0).text;
		var bannerImage = content.getElementsByTagName("image").item(0).text;

		var description = content.getElementsByTagName("description").item(0).text;
		description = description.replace(/\n/g, "").replace(/ +/g, " ");

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


		toolActInd.hide();
		Ti.UI.currentWindow.setRightNavButton(null);
		// Display layout and data
		var win = Ti.UI.currentWindow;

		// HEADER
		var header = Ti.UI.createView({height:105,top:0});
		var headerBanner = Ti.UI.createImageView({left:180, top:10, width:130, url:bannerImage});
		var headerLabel = Ti.UI.createLabel({color:'#FFF', font:{fontWeight:'bold', fontSize:20}, top:15, left:10, width:165, height:70, text:title});
		var headerLabel2 = Ti.UI.createLabel({color:'#777', font:{fontSize:16}, bottom:0, left:10, width:165, height:'auto', text:seriestitle});
		header.add(headerLabel);
		header.add(headerLabel2);
		header.add(headerBanner);

		win.add(header);


		// Scrollable body
		var bodyScroll = Ti.UI.createScrollView({top:110, bottom:30, contentHeight:'auto', contentWidth:'auto', showVerticalScrollIndicator:true});

		var bodyDescAlt = Ti.UI.createLabel({top:0, left:10, right:10, text:altString, height:'auto', font:{fontSize:16}, color:'cyan'});
		var bodyDesc = Ti.UI.createLabel({top:40, left:10, right:10, text:description, height:'auto', color:'#FFF'});
		bodyScroll.add(bodyDescAlt);
		bodyScroll.add(bodyDesc);

		win.add(bodyScroll);

		// Set buttons for toolbar
		// used to evenly distribute items on the toolbar
		var flexSpace = Titanium.UI.createButton({ systemButton:Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE });
		var play = Titanium.UI.createButton({ systemButton:Titanium.UI.iPhone.SystemButton.PLAY });
		var pause = Titanium.UI.createButton({ systemButton:Titanium.UI.iPhone.SystemButton.PAUSE });
		var stop = Titanium.UI.createButton({ systemButton:Titanium.UI.iPhone.SystemButton.STOP });
		//var rewind = Titanium.UI.createButton({ systemButton:Titanium.UI.iPhone.SystemButton.REWIND });
		if (videourl != null) {
			var video = Titanium.UI.createButton({ title:'Video',style:Titanium.UI.iPhone.SystemButtonStyle.BORDERED });
				video.addEventListener('click', function() {
					Ti.API.info('[sermon.js] videourl is ' + videourl);

					//Titanium.UI.createAlertDialog({title:'System Button', message:'ACTION'+videourl}).show();

					var win = Ti.UI.currentWindow;
					var webview = Titanium.UI.createWebView({url:videourl});
					//var window = Titanium.UI.createWindow({title:title});
					win.add(webview);

				});
		}
		var state = 0; // true means display "Play" (actually in pause state) and vice versa.

		// Add functionality to buttons
		var streamer = null;
		play.addEventListener('click', function() {
			if (streamer == null) {
				streamer = Ti.Media.createAudioPlayer();
			}
			switch (streamer.state) {
				case streamer.STATE_INITIALIZED:
					Ti.API.info('[sermon.js] audiourl is ' + audiourl);
					streamer.url = audiourl;
					streamer.start();
					break;
				case streamer.STATE_STOPPED:
					streamer.start();
					break;
				case streamer.STATE_PAUSED:
					streamer.setPaused(false);
					break;
			}
			/*
			if (streamer.state == streamer.STATE_INITIALIZED) {
				Ti.API.info('[sermon.js] audiourl is ' + audiourl);
				streamer.url = audiourl;
				streamer.start();
			} else {
				streamer.setPaused(false);
			}*/
		});

		pause.addEventListener('click', function() {
			//Ti.API.info('[sermon.js] audiourl is ' + audiourl);
			//streamer.url = audiourl;
			streamer.pause();
		});
		stop.addEventListener('click', function() {
			//Ti.API.info('[sermon.js] audiourl is ' + audiourl);
			//streamer.url = audiourl;
			streamer.stop();
		});
		
		win.addEventListener('close',function()
		{
			if (streamer.state == streamer.STATE_PLAYING) {
				Ti.API.info('state is playing will stop now.');
		    	streamer.stop();
			}
		});

		if (videourl != null) {
			win.toolbar = [flexSpace,play,flexSpace,pause,flexSpace,stop,flexSpace,video,flexSpace];
		} else {
			win.toolbar = [flexSpace,play,flexSpace,pause,flexSpace,stop,flexSpace];
		}
		// Add event listener for selection
		/*
		tableview.addEventListener('click',function(e) {
		if (e.rowData.url) {
		var win = Ti.UI.createWindow({
		title:e.rowData.title,
		url:'../sermonviews/sermon.js'
		});
		Ti.UI.currentTab.open(win, {animated:true});
		}
		});
		*/
	} catch(E) {
		alert(E);
	}
};
xhr.send();

