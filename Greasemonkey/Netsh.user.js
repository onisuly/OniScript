// ==UserScript==
// @name        Netsh
// @description Netsh助手 for Firefox Only
// @namespace   onisuly
// @include     http://serve.netsh.org/pub/ipv4-hosts/
// @version     2015.02.18
// @grant       none
// @run-at      document-start
// ==/UserScript==

/*
添加下列规则到广告过滤中：
http://serve.netsh.org/pub/hosts_src/omni.dialog.min.*.js*
http://serve.netsh.org/pub/ipv4-hosts/hosts_src/script.*.js*
*/

(function (w) {  
    // Remove the current jQuery ready code
    function pre_script_execute_handler (e) {       
        var target = e.target;
        if (target.innerHTML.indexOf("$( document ).ready(") != -1) {
            console.log('Removed ready');
            e.preventDefault();
            e.stopPropagation();
            addReady();
        }
    }
    w.addEventListener('beforescriptexecute', pre_script_execute_handler);

    // Add new jQuery ready code
    function addReady () {
        console.log('Adding new ready');
        w.$(document).ready(function () {
            console.log('Our ready called');

            //表单
            for (var i = document.forms[0].elements.length - 1; i >= 0; i--) {
                document.forms[0].elements[i].disabled = false;
                document.forms[0].elements[i].checked = true;
            };

            //说明
            $(".wttxt")[0].value = unicode2Ascii( utf8to16(base64decode( $(".wttxt")[0].value )) )
            $(".wttxt")[0].onclick=""

            //广告检测
            $("form#hform").submit(function(){
                var form = $(this);
                var button = $("#hbtn");
                var text = button.attr('value');
                button.attr('disabled',true);
                button.attr('value', '生成中，请稍等最多30秒..');
                var textarea = $("#hosts-content");
                $.ajax({
                    url: form.attr('action'),
                    type: 'get',
                    data:{
                        passcode: pass,
                        gs: $("#gs").is(':checked')?"on":"off",
                        wk: $("#wk").is(':checked')?"on":"off",
                        twttr: $("#twttr").is(':checked')?"on":"off",
                        fb: $("#fb").is(':checked')?"on":"off",
                        flkr: $("#flkr").is(':checked')?"on":"off",
                        dpbx: $("#dpbx").is(':checked')?"on":"off",
                        odrv: $("#odrv").is(':checked')?"on":"off",
                        yt: $("#yt").is(':checked')?"on":"off",
                        validate: validate,
                        nolh: $("#nolh").is(':checked')?"on":"off"
                    },
                    timeout: 30000,
                    error: function(){
                        button.attr('value', '出现问题，请刷新重试一次');
                        window.location.href = form.attr('action')+"?dpbx=on&gs=on&wk=on&twttr=on&fb=on&flkr=on&odrv=on&yt=on&aapl=on&preview=yes&passcode="+pass+"&validate="+validate;
                    },
                    success: function(txt){
                        //$("form#hosts-output-form textarea").css({color: "#FFF"});
                        textarea.text(txt);
                        button.attr('disabled', null);
                        button.attr('value', '立刻获取');
                        hsir.scrollTo($('#hosts-output').prev(), 600);
                        //$(document.body).find(".hosts-mask").fadeIn(2500);
                    }
                });

                return false;
            });

            $('#select-all').click(function() {
                $("#hosts-content").select();
                try {
                    ga('send', 'event', 'button', 'click', 'IPv4-selectAllHostsContent');
                } catch (e) {}
            });
            

            //Twitter
            $("#hform").append("<input id='btnTwitter' type='button' class='wtbtn' style='margin-left:10px' value='Twitter Hosts' onclick=''>")
            $("#btnTwitter").click(function() {
                $("#hosts-select").append("<iframe src='http://serve.netsh.org/pub/ipv4-hosts/pagead2.googlesyndication.com/NYSE_TWTR.php?passcode=" + pass + "&validate=" + validate + "' height='312px' width='914px'></iframe");
                /*//var a = $('a')[0];
                var a = $("<a href='http://serve.netsh.org/pub/ipv4-hosts/pagead2.googlesyndication.com/NYSE_TWTR.php?passcode=" + pass + "&validate=" + validate + "' target='_blank'></a>").get(0);
                  
                var e = document.createEvent('MouseEvents');
      
                e.initEvent('click', true, true);
                a.dispatchEvent(e);
                console.log('event has been changed');*/
            });
            
        });
    }
}) (unsafeWindow);

function unicode2Ascii(str){
    var n = 0;
    var r = '';
    var m = 0;
    //65535
    for(var i=0;i<str.length;i++){
        if(str.charAt(i)==='&'&& i < str.length-1  &&str.charAt(i+1)==='#'){
            n=0;
            for(var j=0;j<6;j++) {
                m = i+2 + j;
                if(m >= str.length){
                    break;
                }
                if(str.charAt(m)===';'){
                    n = j;
                    break;
                }
            }
            if(n===0){
                r += str.charAt(i);
            }else{
                r += String.fromCharCode(parseInt(str.substr(i+2,n)));
                i+=n+2;
            }
        }else{
            r += str.charAt(i);
        }
    }
   
    return r;
}

/*
**base64实现的代码：
*/
//下面是64个基本的编码
var base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
var base64DecodeChars = new Array( - 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1, -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1);

//编码的方法
function base64encode(str) {
    var out, i, len;
    var c1, c2, c3;
    len = str.length;
    i = 0;
    out = "";
    while (i < len) {
        c1 = str.charCodeAt(i++) & 0xff;
        if (i == len) {
            out += base64EncodeChars.charAt(c1 >> 2);
            out += base64EncodeChars.charAt((c1 & 0x3) << 4);
            out += "==";
            break;
        }
        c2 = str.charCodeAt(i++);
        if (i == len) {
            out += base64EncodeChars.charAt(c1 >> 2);
            out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
            out += base64EncodeChars.charAt((c2 & 0xF) << 2);
            out += "=";
            break;
        }
        c3 = str.charCodeAt(i++);
        out += base64EncodeChars.charAt(c1 >> 2);
        out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
        out += base64EncodeChars.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >> 6));
        out += base64EncodeChars.charAt(c3 & 0x3F);
    }
    return out;
}

//解码的方法
function base64decode(str) {
    var c1, c2, c3, c4;
    var i, len, out;
    len = str.length;
    i = 0;
    out = "";
    while (i < len) {
        do {
            c1 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
        } while ( i < len && c1 == - 1 );
        if (c1 == -1) break;
        do {
            c2 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
        } while ( i < len && c2 == - 1 );
        if (c2 == -1) break;
        out += String.fromCharCode((c1 << 2) | ((c2 & 0x30) >> 4));
        do {
            c3 = str.charCodeAt(i++) & 0xff;
            if (c3 == 61) return out;
            c3 = base64DecodeChars[c3];
        } while ( i < len && c3 == - 1 );
        if (c3 == -1) break;
        out += String.fromCharCode(((c2 & 0XF) << 4) | ((c3 & 0x3C) >> 2));
        do {
            c4 = str.charCodeAt(i++) & 0xff;
            if (c4 == 61) return out;
            c4 = base64DecodeChars[c4];
        } while ( i < len && c4 == - 1 );
        if (c4 == -1) break;
        out += String.fromCharCode(((c3 & 0x03) << 6) | c4);
    }
    return out;
}

function utf16to8(str) {
    var out, i, len, c;
    out = "";
    len = str.length;
    for (i = 0; i < len; i++) {
        c = str.charCodeAt(i);
        if ((c >= 0x0001) && (c <= 0x007F)) {
            out += str.charAt(i);
        } else if (c > 0x07FF) {
            out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
            out += String.fromCharCode(0x80 | ((c >> 6) & 0x3F));
            out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
        } else {
            out += String.fromCharCode(0xC0 | ((c >> 6) & 0x1F));
            out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
        }
    }
    return out;
}

function utf8to16(str) {
    var out, i, len, c;
    var char2, char3;
    out = "";
    len = str.length;
    i = 0;
    while (i < len) {
        c = str.charCodeAt(i++);
        switch (c >> 4) {
        case 0:
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
        case 6:
        case 7:
            // 0xxxxxxx
            out += str.charAt(i - 1);
            break;
        case 12:
        case 13:
            // 110x xxxx   10xx xxxx
            char2 = str.charCodeAt(i++);
            out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));
            break;
        case 14:
            // 1110 xxxx  10xx xxxx  10xx xxxx
            char2 = str.charCodeAt(i++);
            char3 = str.charCodeAt(i++);
            out += String.fromCharCode(((c & 0x0F) << 12) | ((char2 & 0x3F) << 6) | ((char3 & 0x3F) << 0));
            break;
        }
    }
    return out;
}