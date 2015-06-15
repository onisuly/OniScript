// ==UserScript==
// @name        Steam商店视频下载
// @namespace   onisuly
// @include     http://store.steampowered.com/app/*
// @version     2015-06-15
// @grant       none
// @run-at      document-end
// ==/UserScript==

var e = document.createElement("a");
e.setAttribute("class", "btnv6_blue_hoverfade btn_medium");
e.innerHTML = "<span>解析视频</span>";
e.onclick = showDialog;
document.getElementsByClassName("apphub_OtherSiteInfo")[0].appendChild(e);

function showDialog() {
    var quality = ["movie480", "movie_max"];
    var result = "";
    for ( var i = 0; i < quality.length; ++i ) {
        var video_list = "";
        var regx = new RegExp("http[s]?:\/\/[a-z0-9\\.\\/]+?" + quality[i] + ".webm\\?t=[0-9]+", "ig");
        var video = document.getElementsByTagName('html')[0].innerHTML.match(regx);
        if ( video != null ) {
            for ( var j = 0; j < video.length; j+=2 ) {
                video_list += video[j] + "<br/>";
            }
            result += "-------------清晰度：" + quality[i].substr(-3, 3) + "-------------<br/>" + video_list + "<br/><br/>";
        }
        else {
            result = "此页面没有视频！";
        }
        
    }
    ShowAlertDialog("视频下载地址：", result);
}