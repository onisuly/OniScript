// ==UserScript==
// @name        pptv
// @namespace   onisuly
// @description 不安装pp加速器= =||
// @include     http://v.pptv.com/show/*
// @run-at      document-start
// @version     2014.11.29
// @grant       none
// ==/UserScript==

var redirect = "http://www.soku.com/search/redirect.html?url=";

if( document.referrer.indexOf(redirect) == -1 ) {
    window.location = redirect + window.location;
}