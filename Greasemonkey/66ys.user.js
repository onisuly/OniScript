// ==UserScript==
// @name        66ys
// @description 66影视功能增强
// @namespace   onisuly
// @include     http://www.66ys.cc/*
// @version     2015.01.11
// @grant       none
// @run-at      document-end
// ==/UserScript==
/*
**查询豆瓣电影信息
*/
var title = document.getElementsByClassName("title")[0].innerHTML;
var subtitle = title.substring(1, title.length - 1);
subtitle = subtitle.replace(/\[(第.+季)*.*\]/g, " $1");
document.getElementsByClassName("title")[0].innerHTML = '<a style="text-decoration:none" target="_blank" href="http://movie.douban.com/subject_search?search_text=' + encodeURI(subtitle) + '" >' + title + '</a>';

/*
**显示云播放按钮
*/
var ebox = document.createElement("div");
ebox.innerHTML = "云播放";
ebox.style.cssText = "display:none;position:absolute;cursor:pointer;padding:2px 10px;text-align:center;border:1px solid #e0e0e0;background:#fff;border-radius:5px";

ebox.onmouseover = function() {
    this.style.background = "#5CB542";
    this.style.color = "#fff";
    this.style.display = "block";
};
ebox.onmouseout = function() {
    this.style.background = "#fff";
    this.style.color = "";
    this.style.display = "none";
};
document.body.appendChild(ebox);

function createBox( element, link ) {
    element.onmouseover = function() {
        var boxleft = this.offsetLeft;
        var boxtop = this.offsetTop;
        var etmp = this;
        while (etmp = etmp.offsetParent) {
            boxleft += etmp.offsetLeft;
            boxtop += etmp.offsetTop;
        }
        ebox.onclick = (function() {
            window.open("http://www.dychao.com/play.html?url=" + encodeURI(link), "_blank");
        });
        ebox.style.left = boxleft - 2 + this.offsetWidth + "px";
        ebox.style.top = boxtop -10 + "px";
        ebox.style.display = "block";
    };
    element.onmouseout = function() {
        ebox.style.display = "none";
    };
}

var tablecount = document.getElementsByTagName("table").length - 19;
for (; tablecount > 0; --tablecount) {
    var objarr = document.getElementsByTagName("table")[tablecount + 13].getElementsByTagName("a");
    for (var i = objarr.length - 1; i >= 0; --i) {
        if (objarr[i].href.indexOf(window.location) == 0) {
            var thunder = objarr[i].outerHTML.match(/thunder:\/\/.*?(?=")/);
            createBox(objarr[i], thunder);
        }
        else if ( objarr[i].href.match(/ed2k:\/\/\|file\|.+\//i) || objarr[i].href.match(/magnet:?.+/i) ) {
            createBox(objarr[i], objarr[i].href);
        }
    }
}