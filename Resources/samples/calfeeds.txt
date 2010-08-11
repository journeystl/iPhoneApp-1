#!/bin/sh

wget -O cal.xml "http://www.google.com/calendar/feeds/infotg%40journeyon.net/public/basic?futureevents=true&orderby=starttime&sortorder=a&max-results=20&ctz=America%2FChicago&singleevents=true"
xmlindent -o cal2.xml cal.xml


(campus group ids)
HR - 2094
ME - 2096
TG - 2093
WC - 2098