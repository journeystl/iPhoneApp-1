#!/bin/sh

wget -O caltg.xml "http://www.google.com/calendar/feeds/infotg%40journeyon.net/public/basic?futureevents=true&orderby=starttime&sortorder=a&max-results=20&ctz=America%2FChicago&singleevents=true"
xmlindent -o caltg.xml caltg.xml
wget -O calhr.xml "http://www.google.com/calendar/feeds/infohr%40journeyon.net/public/basic?futureevents=true&orderby=starttime&sortorder=a&max-results=20&ctz=America%2FChicago&singleevents=true"
xmlindent -o calhr.xml calhr.xml
wget -O calme.xml "http://www.google.com/calendar/feeds/infome%40journeyon.net/public/basic?futureevents=true&orderby=starttime&sortorder=a&max-results=20&ctz=America%2FChicago&singleevents=true"
xmlindent -o calme.xml calme.xml
wget -O calwc.xml "http://www.google.com/calendar/feeds/infowc%40journeyon.net/public/basic?futureevents=true&orderby=starttime&sortorder=a&max-results=20&ctz=America%2FChicago&singleevents=true"
xmlindent -o calwc.xml calwc.xml

rm *.xml~
