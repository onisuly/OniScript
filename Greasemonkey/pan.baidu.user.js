// ==UserScript==
// @name        pan.baidu
// @namespace   onisuly
// @include     http://pan.baidu.com/wap/*
// @version     2015.06.17
// @grant       none
// @run-at      document-end
// ==/UserScript==

if ( window.location.href.match(/http[s]?:\/\/pan.baidu.com\/wap\/share\/home.+/) ) {
    window.location.href = window.location.href.replace("wap/", "");
}
else if ( window.location.href.match(/http[s]?:\/\/pan.baidu.com\/wap\/link.+/) ) {
    window.location.href = window.location.href.replace("wap", "share");
}
else if ( window.location.href.match(/http[s]?:\/\/pan.baidu.com\/wap\/album\/file.+/) ) {
    window.location.href = window.location.href.replace("wap", "pcloud");
}
/*else if ( window.location.href.match(/http[s]?:\/\/pan.baidu.com\/wap\/shareview.+/) ) {
    window.location.href = window.location.href.replace("shareview", "link");
}*/