Ti.include("bibledb.js");

var win = Titanium.UI.currentWindow;
var oldscrollpointer = null;
var urlbase = "http://www.esvapi.org/v2/rest/passageQuery?key=IP&include-audio-link=false&passage=";
var curOffset = 0;

var month_names = new Array ( );
month_names[month_names.length] = "Jan";
month_names[month_names.length] = "Feb";
month_names[month_names.length] = "Mar";
month_names[month_names.length] = "Apr";
month_names[month_names.length] = "May";
month_names[month_names.length] = "Jun";
month_names[month_names.length] = "Jul";
month_names[month_names.length] = "Aug";
month_names[month_names.length] = "Sep";
month_names[month_names.length] = "Oct";
month_names[month_names.length] = "Nov";
month_names[month_names.length] = "Dec";


function grabVersesForDay(offset) {
	var xhrarr = [];
	var verseviews = [];
	
	var thisDay = new Date();
	thisDay.setDate(thisDay.getDate() + offset);
	var month = thisDay.getMonth() + 1;
	var day = thisDay.getDate();
	
	win.title = ""+month_names[month-1]+" "+day;
	Ti.API.info('[engage.js] verses are: '+ dailyBible[""+month+"/"+day]);
	var versesarr = dailyBible[""+month+"/"+day].split(",");
	var countxhr = 0;

	for (var i = 0; i < versesarr.length; i++) {
		var url = urlbase + versesarr[i];
		//Titanium.UI.createAlertDialog({title:'System Button', message:'ACTION'+url}).show();
		Ti.API.info('[engage.js] verses are: '+ versesarr[i]);

		if (versesarr[i] == "off") {
			verseviews[i] = "<html><head><LINK REL=StyleSheet HREF=\"http://www.gnpcb.org/esv/assets/style/text.css\" TYPE=\"text/css\" MEDIA=screen><STYLE TYPE=\"text/css\" MEDIA=screen><!-- body{ bgcolor=\"#444\"; font: 100%/1.5  \serif; } --> </STYLE></head><body><h2>Take a break!</h2></body></html>";
			countxhr++;
		} else {
			xhrarr[i] = Titanium.Network.createHTTPClient();
			xhrarr[i].onload = function() {
				var doc = this.responseText;
				doc = "<html><head><LINK REL=StyleSheet HREF=\"http://www.gnpcb.org/esv/assets/style/text.css\" TYPE=\"text/css\" MEDIA=screen><STYLE TYPE=\"text/css\" MEDIA=screen><!-- body{ bgcolor=\"#444\"; font: 100%/1.5  \serif; } --> </STYLE></head><body>" + doc + "</body></html>";
				verseviews[this.verseindex] = doc;
				Ti.API.info('[engage.js] countxhr: '+countxhr + "i: " + this.verseindex);
				countxhr++;
			};
			xhrarr[i].verseindex = i;
			xhrarr[i].open('GET', url);
			xhrarr[i].send();
		}
	}

	// Need to wait till all xhrrequests are done!
	var timeout = setInterval(function() {
			Ti.API.info('[engage.js] countxhr: '+countxhr + ", versesarr.length is: " + versesarr.length);

	        if (countxhr == versesarr.length) {
	            clearInterval(timeout);
				for (i = 0; i < countxhr; i++) {
					verseviews[i] = Titanium.UI.createWebView({html:verseviews[i]});
				}
				
				if (oldscrollpointer != null) {
					win.remove(oldscrollpointer);
				}
				
				var scrollView = Titanium.UI.createScrollableView({
				    views:verseviews,
				    showPagingControl:true,
				    pagingControlHeight:30,
				    maxZoomScale:2.0,
				    currentPage:0
				});
				win.add(scrollView);
				oldscrollpointer = scrollView;
	        }
	    }, 500);
}
var navbLeft = Titanium.UI.createButton({title:'<'});
var navbRight = Titanium.UI.createButton({title:'>'});
navbLeft.addEventListener('click', function() {
	curOffset--;
	grabVersesForDay(curOffset);
});
navbRight.addEventListener('click', function() {
	curOffset++;
	grabVersesForDay(curOffset);
});
win.leftNavButton = navbLeft;
win.rightNavButton = navbRight;
grabVersesForDay(curOffset);


